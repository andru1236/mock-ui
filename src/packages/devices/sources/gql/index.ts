import {
  executeMutationV2,
  executeQuery,
} from "../../../../services/gql_client";

import emmitToastMessage from "../../../common/emmitToastMessage";
import { IDevice } from "../../../../domain/device";

import { mutations } from "./mutations";
import { queries } from "./queries";

export const createDevice = async (name, port) => {
  const response = await executeMutationV2(mutations.gqlCreateDevice, {
    name,
    port,
  });
  if (response?.data) {
    return response.data;
  }
  emmitToastMessage.success("Device was created successfully", "");
  return response;
};

export const updateDevice = async (deviceId, name, port, agentDb) => {
  try {
    const response = await executeMutationV2(mutations.gqlUpdateDevice, {
      deviceId,
      name,
      port,
      agentDb,
    });
    emmitToastMessage.success(
      "Device was updated successfully",
      `Device id [${deviceId}]`
    );
    return response;
  } catch (err) {
    emmitToastMessage.error(
      "Something wrong in the device updated",
      `Device id [${deviceId}]`
    );
  }
};

export const removeDevice = async (deviceId) => {
  const response = await executeMutationV2(mutations.gqlRemoveDevice, {
    deviceId,
  });
  if (response?.data) {
    emmitToastMessage.success(
      "Device was removed successfully",
      `Device id [${deviceId}]`
    );
    return response.data.removeDevice;
  }
  emmitToastMessage.error(
    "Error in the response format",
    `Device id [${deviceId}]`
  );
  return false;
};

export const startDeviceSimulation = async (deviceId) => {
  const response = await executeMutationV2(mutations.gqlStartDeviceSimulation, {
    deviceId,
  });
  if (response?.data?.startSimulation) {
    emmitToastMessage.success(
      "The simulation started successfully",
      `Device id [${deviceId}]`
    );
    return response.data.startSimulation;
  }
  emmitToastMessage.error(
    "The device was not able to start",
    `Device id [${deviceId}] \n Probably response format`
  );
  return false;
};

export const stopDeviceSimulation = async (deviceId) => {
  const response = await executeMutationV2(mutations.gqlStopDeviceSimulation, {
    deviceId,
  });
  if (response?.data?.stopSimulation) {
    emmitToastMessage.success(
      "Device has beend stoped",
      `Device id [${deviceId}]`
    );
    return response.data.stopSimulation;
  }
  emmitToastMessage.error(
    "The Device was not able to stop to run",
    `Device id [${deviceId}] \n probably error in the Format response`
  );
  return false;
};

export const fixAgentDb = async (agentDb) => {
  const response = await executeMutationV2(mutations.gqlFixAgentDb, {
    agentDb,
  });
  if (response?.data) {
    emmitToastMessage.success("The agenDb was fixed", "");
    return response.data.fixAgentDb;
  }
  emmitToastMessage.error("Error in the response format", "");
  return agentDb;
};

export const getOneDevice = async (deviceId) => {
  const options = {
    query: queries.getOneDevice,
    variables: { deviceId: deviceId },
  };
  try {
    const response = await executeQuery(options);
    if (response?.data?.device) {
      return response.data.device;
    }
    throw new Error("Error in get the object device");
  } catch (e) {
    throw e;
  }
};

export const getAllDevices = async (): Promise<IDevice[]> => {
  try {
    const response = await executeQuery({
      query: queries.getDevices,
      variables: {},
    });
    if (response?.data?.devices) {
      return response.data.devices;
    }
    throw new Error("Error in the response format");
  } catch (err) {
    throw err;
  }
};
