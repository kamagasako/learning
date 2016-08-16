-module(area_server0).
-export([loop/0]).

loop() ->
    receive
        {rectangle, Width, Height} ->
            io:format("Area of rectangle is ~p~n", [Width * Height]);
        {circle, R} ->
            io:format("Area of circle is ~p~n", [3.14 * R * R]);
        Other ->
            io:format("I don't know what the area of ~p is~n", [Other])
    end,
    loop().
