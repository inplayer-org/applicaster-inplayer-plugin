import XRayLogger from "@applicaster/quick-brick-xray";

export const BaseSubsystem = "plugins/quick-brick-inplayer";
export const BaseCategories = {
  GENERAL: "general",
  LOCAL_STORAGE: "local_storage_wrapper",
  PAYLOAD_HELPER: "payload_helper",
  INPLAYER_SERVICE: "inplayer_service",
};

export const Subsystems = {
  ACCOUNT: `${BaseSubsystem}/account_flow`,
  ASSET: `${BaseSubsystem}/asset_flow`,
};

export const AccountSubsystems = {
  LOGIN: `${Subsystems.ACCOUNT}/login`,
  SIGN_UP: `${Subsystems.ACCOUNT}/signUp`,
  FORGOT_PASSWORD: `${Subsystems.ACCOUNT}/forgot_password`,
  SET_NEW_PASSWORD: `${Subsystems.ACCOUNT}/set_new_password`,
  PARENT_LOCK: `${Subsystems.ACCOUNT}/parent_lock`,
};

export const AssetSubsystems = {
  STOREFRONT: `${Subsystems.ASSET}/storefront`,
  POLICY: `${Subsystems.ASSET}/licence_policy`,
};
export const AssetCategories = {
  GENERAL: "general",
};

export function createLogger({ category = "", subsystem, parent = null }) {
  console.log("createLogger", { category, subsystem, parent });
  if (!subsystem) {
    return null;
  }

  const logger = new XRayLogger(category, subsystem, parent);
  logger.addContext(getContext());
  return logger;
}

function getContext() {
  return { userName: "", email: "" };
}
