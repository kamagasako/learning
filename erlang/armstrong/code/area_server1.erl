-module(area_server1).
-export([loop/0, rpc/2]).

rpc(Pid, Request) ->
    Pid ! {self(), Request},
    receive
        Response ->
            Response
    end.

loop() ->
    receive
        {From, {rectangle, Width, Height}} ->
            From ! Width * Height;
        {From, {circle, R}} ->
            From ! 3.14 * R * R;
        {From, Other} ->
            From ! {error, Other}
    end,
    loop().
