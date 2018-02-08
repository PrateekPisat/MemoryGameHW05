defmodule MemoryWeb.PageView do
  use MemoryWeb, :view

	def cookies(conn, cookie_name) do
        conn.cookies[cookie_name]
    end
end
