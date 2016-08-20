defmodule Exercise do
  def sum(0), do: 0
  def sum(n), do: n + sum(n - 1)

  def sum2_tail(0, acc), do: acc
  def sum2_tail(n, acc), do: sum2_tail(n - 1, acc + n)
  def sum2(n) do
    sum2_tail(n, 0)
  end

  def sum3(n), do: (1 + n) * n / 2

  use Bitwise
  def sum4(n), do: (1 + n) * n >>> 1

  def gcd(x, 0), do: x
  def gcd(x, y) when x >= y, do: gcd(y, rem(x, y))
  def gcd(x, y), do: gcd(y, x)

end
