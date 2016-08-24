%%%-------------------------------------------------------------------
%%% @author KAMAGASAKO Masatoshi <m.kamagasako@kpnetworks.jp>
%%% @copyright (C) 2016, KAMAGASAKO Masatoshi
%%% @doc
%%%
%%% @end
%%% Created : 24 Aug 2016 by KAMAGASAKO Masatoshi <m.kamagasako@kpnetworks.jp>
%%%-------------------------------------------------------------------
-module(sellaprime_supervisor).

-behaviour(supervisor).

%% API
-export([start_link/1]).
-export([start/0, start_in_shell_for_testing/0]).

%% Supervisor callbacks
-export([init/1]).

-define(SERVER, ?MODULE).

%%%===================================================================
%%% API functions
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the supervisor
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link(Args) ->
    supervisor:start_link({local, ?SERVER}, ?MODULE, Args).

start() ->
    spawn(fun() ->
                  supervisor:start_link({local, ?SERVER}, ?MODULE, _Args = [])
          end).

start_in_shell_for_testing() ->
    {ok, Pid} = supervisor:start_link({local, ?SERVER}, ?MODULE, _Args = []),
    unlink(Pid).

%%%===================================================================
%%% Supervisor callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a supervisor is started using supervisor:start_link/[2,3],
%% this function is called by the new process to find out about
%% restart strategy, maximum restart intensity, and child
%% specifications.
%%
%% @spec init(Args) -> {ok, {SupFlags, [ChildSpec]}} |
%%                     ignore |
%%                     {error, Reason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    gen_event:swap_handler(alarm_handler,
                           {alarm_handler, swap},
                           {my_alarm_handler, xyz}),
    SupFlags = #{strategy => one_for_one,
                 intensity => 3,
                 period => 1},
    AChild = #{id => tag1,
               start => {area_server, start_link, []},
               restart => permanent,
               shutdown => 10000,
               type => worker,
               modules => [area_server]},
    PChild = #{id => tag2,
               start => {prime_server, start_link, []},
               restart => permanent,
               shutdown => 10000,
               type => worker,
               modules => [prime_server]},

    {ok, {SupFlags, [AChild, PChild]}}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
