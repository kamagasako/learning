package example

import akka.Done
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.StatusCodes
import akka.http.scaladsl.model.ws.{Message, TextMessage, WebSocketRequest}
import akka.stream.{ActorMaterializer, OverflowStrategy}
import akka.stream.scaladsl.{Flow, Keep, Sink, Source, SourceQueueWithComplete}

object Hello {

  def main(args: Array[String]) = {
    implicit val system = ActorSystem()
    implicit val materializer = ActorMaterializer()
    import system.dispatcher

    val source: Source[Message, SourceQueueWithComplete[Message]] = Source.queue[Message](128, OverflowStrategy.backpressure)

    val flow: Flow[Message, Message, SourceQueueWithComplete[Message]] = Flow.fromSinkAndSourceMat(Sink.ignore, source)(Keep.right)

    val (res, queue) = Http().singleWebSocketRequest(WebSocketRequest("ws://localhost:9000/socket"), flow)
    //println(s"res: ${res}, queue: ${queue}")

    val connected = res.map { upgrade =>
      //println(s"upgrade: ${upgrade}")
      if (upgrade.response.status == StatusCodes.SwitchingProtocols) {
        Done
      } else {
        throw new RuntimeException("hoge");
      }
    }
    //println(s"connected: ${connected}")

    connected.onComplete { obj =>
      //println(s"complete: ${obj}")
      queue.offer(TextMessage("hogefuga"))
    }
  }
}
