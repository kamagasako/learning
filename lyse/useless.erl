-module(useless).

-export([add/2, hello/0, greet_and_add_two/1, greet/2]).

-define(HOUR, 3600).
-define(sub(X, Y), X - Y).

add(A, B) ->
    A + B.

hello() ->
    io:format("hello, world~n").

greet_and_add_two(X) ->
    hello(),
    add(X, 2).

greet(male, Name) ->
    io:format("Hello, Mr. ~s!~n", [Name]);
greet(female, Name) ->
    io:format("Hello, Mrs. ~s!~n", [Name]);
greet(_, Name) ->
    io:format("Hello, ~s!~n", [Name]).
