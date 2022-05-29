// net.createServer is separately polyfilled, because its underlying Deno.listen is not supported on Deno Deploy.
// It's only used in tests, so seperated file avoids calling Deno.listen on production, making it usable on Deploy.

export function net_createServer() {
  const server = {
    address() {
      return { port: 9876 }
    },
    async listen() {
      server.raw = Deno.listen({ port: 9876, transport: 'tcp' })
      for await (const conn of server.raw)
        setTimeout(() => conn.close(), 500)
    },
    close() {
      server.raw.close()
    }
  }
  return server
}
