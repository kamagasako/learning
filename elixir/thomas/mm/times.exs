defmodule Times do
  def double(n) do
    n * 2
  end
  def double2(n), do: n * 2
  def double3(n), do: (
    n * 2
  )

  def triple(n), do: n * 3

  def quadruple(n), do: double(double(n))
end
