const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xd3a86612e77295539656": 100, // dan
  "0x9d9e6f1312b5d7e321c7": 50, // jack
  "0x4f3e7f750a10daff15c6": 75, // bench
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

/* credentials

➜  scripts git:(main) ✗ node generate.js
privateKey: fccf15448daa48e412c0d72551b8a006aa07140f36fb516ee0a62890d5ad05b3
publicKey: 04fc51638d3647b00f100a41e906915da218880869f27c7420a53e1368aed7b2aa3cb102c14819f703bee6df5bd5cfd4d9408ff8c5e46ce11e1a8edfb57e3e6acf
Address: 0xd3a86612e77295539656
➜  scripts git:(main) ✗ node generate.js
privateKey: aefef66dbdc4ab1345d845981b57b9bf231ec7eea0ae71748d5fe61f13cda51d
publicKey: 043ac7b1147796a3cea0c59232de7e56e2b25d7f75da2fe72406599edf71e41ca1ee9285e9052be2a1f4c9a8874de391da36f3d40459f0b509451e2286e98522cc
Address: 0x9d9e6f1312b5d7e321c7
➜  scripts git:(main) ✗ node generate.js
privateKey: 807d577872f9256a2c5265fc82b0afb37a65a7bbfa3d6604bd4ef66076ab78f7
publicKey: 04d1199e942b5ef0076c27668a6032e67cdc92b703f41948733880dd0e03acf589e20a59b9ec5673c72b939d73ab728772257ae3ed373acc3d8b86a443bee656c8
Address: 0x4f3e7f750a10daff15c6

*/