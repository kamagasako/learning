import Dependencies._

lazy val root = (project in file(".")).
  settings(
    inThisBuild(List(
      organization := "com.example",
      scalaVersion := "2.11.8",
      version      := "0.1.0-SNAPSHOT"
    )),
    name := "Hello",
    libraryDependencies ++= Seq(
      scalaTest % Test,
      "com.typesafe.akka" %% "akka-stream" % "2.5.0",
      "com.typesafe.akka" %% "akka-http" % "10.0.5"
    ),
    resolvers += Resolver.mavenLocal//,
    //mainClass in assembly := Some("example.Hello")
  )
