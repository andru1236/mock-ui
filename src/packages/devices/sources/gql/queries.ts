import { gql } from "@apollo/client";

const getDevices = gql`
  query getDevices {
    devices {
      id
      name
      port
      isRunning
    }
  }
`;

const getOneDevice = gql`
  query getOneDevice($deviceId: String!) {
    device(deviceId: $deviceId) {
      id
      name
      port
      isRunning
      agentDb
    }
  }
`;

export const queries = {
  getDevices,
  getOneDevice,
};
