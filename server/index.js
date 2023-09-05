const createServer = require('./server');

async function main() {
  const app = await createServer({alter: true});
  app.listen('3001', () => {
    console.log("App is running!");
  })
}

main();
