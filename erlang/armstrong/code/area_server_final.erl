-module(area_server_final).
-export([start/0, area/2]).

start() -> spawn(fun loop/0).

area(Pid, What) -> rpc(Pid, What).

rpc(Pid, Request) ->
    Pid ! {self(), Request},
    receive
        {Pid, Response} -> Response
    end.

loop() ->
    receive
        {From, {rectangle, Width, Height}} ->
            From ! {self(), Width * Height};
        {From, {circle, R}} ->
            From ! {self(), 3.14 * R * R};
        {From, Other} ->
            From ! {self(), {error, Other}}
    end,
    loop().
