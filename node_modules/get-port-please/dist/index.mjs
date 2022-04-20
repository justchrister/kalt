import { createServer } from 'net';
import { getMemo, setMemo } from 'fs-memo';

async function getPort(config) {
  if (typeof config === "number" || typeof config === "string") {
    config = { port: parseInt(config + "") };
  }
  const options = {
    name: "default",
    random: false,
    port: parseInt(process.env.PORT || "") || 3e3,
    ports: [4e3, 5e3, 6e3, 7e3],
    host: process.env.HOST || "0.0.0.0",
    memoName: "port",
    ...config
  };
  const portsToCheck = [];
  if (!options.random) {
    if (options.port) {
      portsToCheck.push(options.port);
    }
    if (Array.isArray(options.ports)) {
      portsToCheck.push(...options.ports);
    }
  }
  const memoOptions = { name: options.memoName, dir: options.memoDir };
  const memoKey = "port_" + options.name;
  const memo = await getMemo(memoOptions);
  if (memo[memoKey]) {
    portsToCheck.push(memo[memoKey]);
  }
  const availablePort = await checkPorts(portsToCheck, options.host);
  await setMemo({ [memoKey]: availablePort }, memoOptions);
  return availablePort;
}
async function checkPorts(ports, host) {
  for (const port of ports) {
    const r = await checkPort(port, host);
    if (r) {
      return r;
    }
  }
  return checkPort(0, host);
}
function checkPort(port, host = process.env.HOST || "0.0.0.0") {
  return new Promise((resolve) => {
    const server = createServer();
    server.unref();
    server.on("error", () => {
      resolve(false);
    });
    server.listen(port, host, () => {
      const { port: port2 } = server.address();
      server.close(() => {
        resolve(port2);
      });
    });
  });
}

export { checkPort, checkPorts, getPort };
