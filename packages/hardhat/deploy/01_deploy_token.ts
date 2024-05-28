import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("HarryToken", {
    from: deployer,
    // args: [deployer],
    log: true,
    autoMine: true,
  });

  const token = await hre.ethers.getContract<Contract>("HarryToken", deployer);
  console.log("👋 Token Name:", await token.name());
};

export default deployToken;

deployToken.tags = ["TokenHRY"];
