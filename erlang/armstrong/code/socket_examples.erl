-module(socket_examples).
-export([nano_get_url/0]).
-export([start_nano_server/0, nano_client_eval/1]).
-export([error_test/0]).

nano_get_url() ->
    nano_get_url("www.google.com"). % 302: Found (contents moved)

nano_get_url(Host) ->
    {ok, Socket} = gen_tcp:connect(Host, 80, [binary, {packet, 0}]),
    ok = gen_tcp:send(Socket, "GET / HTTP/1.0\r\n\r\n"),
    receive_data(Socket, []).

receive_data(Socket, SoFar) ->
    receive
        {tcp, Socket, Bin} ->
            receive_data(Socket, [Bin|SoFar]);
        {tcp_closed, Socket} ->
            list_to_binary(lists:reverse(SoFar))
    end.

start_nano_server() ->
    {ok, Listen} = gen_tcp:listen(2345, [binary, {packet, 4},
                                         {reuseaddr, true},
                                         {active, true}]),
    {ok, Socket} = gen_tcp:accept(Listen),
    gen_tcp:close(Listen),
    inet:setopts(Socket, [{packet, 4}, {nodelay, true}, {active, true}]), % added
    loop(Socket).

loop(Socket) ->
    receive
        {tcp, Socket, Bin} ->
            io:format("received binary: ~p~n", [Bin]),
            Str = binary_to_term(Bin),
            io:format("unpacked: ~p~n", [Str]),
            %Reply = lib_misc:string2value(Str),
            Reply = string2value(Str),
            io:format("reply: ~p~n", [Reply]),
            gen_tcp:send(Socket, term_to_binary(Reply)),
            loop(Socket);
        {tcp_closed, Socket} ->
            io:format("closed~n")
    end.

nano_client_eval(Str) ->
    {ok, Socket} = gen_tcp:connect("localhost", 2345, [binary, {packet, 4}]),
    ok = gen_tcp:send(Socket, term_to_binary(Str)),
    receive
        {tcp, Socket, Bin} ->
            io:format("received binary: ~p~n", [Bin]),
            Val = binary_to_term(Bin),
            io:format("result: ~p~n", [Val]),
            gen_tcp:close(Socket)
    end.

% https://forums.pragprog.com/forums/27/topics/384
string2value(Str) ->
    {ok, Tokens, _} = erl_scan:string(Str ++ "."),
    {ok, Exprs} = erl_parse:parse_exprs(Tokens),
    Bindings = erl_eval:new_bindings(),
    {value, Value, _} = erl_eval:exprs(Exprs, Bindings),
    Value.


error_test() ->
    spawn(fun() -> error_test_server() end),
    %lib_misc:sleep(2000),
    sleep(2000),
    {ok, Socket} = gen_tcp:connect("localhost", 4321, [binary, {packet, 2}]),
    io:format("connected to: ~p~n", [Socket]),
    gen_tcp:send(Socket, <<"123">>),
    receive
            Any -> io:format("Any=~p~n", [Any])
    end.

error_test_server() ->
    {ok, Listen} = gen_tcp:listen(4321, [binary, {packet, 2}]),
    {ok, Socket} = gen_tcp:accept(Listen),
    error_test_server_loop(Socket).

error_test_server_loop(Socket) ->
    receive
        {tcp, Socket, Data} ->
            io:format("received: ~p~n", [Data]),
            _ = atom_to_list(Data),
            error_test_server_loop(Socket)
    end.

sleep(T) ->
    receive
    after T -> true
    end.
