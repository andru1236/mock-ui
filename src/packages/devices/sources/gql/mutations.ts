import { gql } from "@apollo/client";

const gqlCreateDevice = gql`
  mutation gqlCreateDevice($name: String, $port: Int) {
    createDevice(name: $name, port: $port)
  }
`;

const gqlUpdateDevice = gql`
  mutation gqlUpdateDevice(
    $deviceId: String!
    $name: String
    $port: Int
    $agentDb: String
  ) {
    updateDevice(
      deviceId: $deviceId
      name: $name
      port: $port
      agentDb: $agentDb
    )
  }
`;

const gqlRemoveDevice = gql`
  mutation gqlRemoveDevice($deviceId: String) {
    removeDevice(deviceId: $deviceId)
  }
`;

const gqlStartDeviceSimulation = gql`
  mutation gqlStartDeviceSimulation($deviceId: String!) {
    startSimulation(deviceId: $deviceId)
  }
`;

const gqlStopDeviceSimulation = gql`
  mutation gqlStopDeviceSimulation($deviceId: String!) {
    stopSimulation(deviceId: $deviceId)
  }
`;

const gqlFixAgentDb = gql`
  mutation gqlFixAgentDb($agentDb: String!) {
    fixAgentDb(agentDb: $agentDb)
  }
`;

export const mutations = {
  gqlCreateDevice,
  gqlUpdateDevice,
  gqlRemoveDevice,
  gqlStopDeviceSimulation,
  gqlStartDeviceSimulation,
  gqlFixAgentDb,
};
