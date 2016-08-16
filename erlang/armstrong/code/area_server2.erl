-module(area_server2).
-export([loop/0, rpc/2]).

rpc(Pid, Request) ->
    Pid ! {self(), Request},
    receive
        {Pid, Response} ->
            Response
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
