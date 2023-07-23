const fsp = require("fs/promises");

const run = async () => {
  const contents = JSON.parse(
    await fsp.readFile("./breaches.json", { encoding: "utf-8" })
  );

  const domains = contents.map((breach) => breach.Domain);
  // const sample = domains.slice(0, 25);
  let tested = 0;
  let twohundreds = 0;
  let textplain = 0;
  const files = {};
  for (const domain of domains) {
    console.log(`testing domain: ${domain}`);
    if (domain.indexOf("." > 0)) {
      tested = ++tested;
      try {
        const response = await fetch(
          `https://${domain}/.well-known/security.txt`
        );
        if (response.ok) {
          twohundreds = ++twohundreds;
          const contentType = response.headers.get("content-type");
          console.log(contentType);
          if (contentType.includes("text/plain")) {
            textplain = ++textplain;
            const contents = await response.text();
            await fsp.writeFile(
              `./security_files/${domain}_security.txt`,
              contents,
              {
                encoding: "utf-8",
              }
            );
            console.log(`Found: ${contents}`);
          }
        }
      } catch (err) {}
    }
  }

  console.log({ tested, twohundreds, textplain, files });
};

run();
