export enum FileConfigurationActionTypes {
    FileConfigurationFetch = "@@FileConfiguration/FileConfigurationFetch",
    FileConfigurationFetchSuccess = "@@FileConfiguration/FileConfigurationFetchSuccess",
    FileConfigurationFetchFailed = "@@FileConfiguration/FileConfigurationFetchFailed",

    FileConfigurationCreate = "@@FileConfiguration/FileConfigurationCreate",
    FileConfigurationCreateSuccess = "@@FileConfiguration/FileConfigurationCreateSuccess",
    FileConfigurationCreateFailed = "@@FileConfiguration/FileConfigurationCreateFailed",
    FileConfigurationCreateModal = "@@FileConfiguration/FileConfigurationCreateModal",

    FileConfigurationUpdate = "@@FileConfiguration/FileConfigurationUpdate",
    FileConfigurationUpdateSuccess = "@@FileConfiguration/FileConfigurationUpdateSuccess",
    FileConfigurationUpdateFailed = "@@FileConfiguration/FileConfigurationUpdateFailed",
    FileConfigurationUpdateModal = "@@FileConfiguration/FileConfigurationUpdateModal",

    OptionsFetch = "@@FileConfiguration/OptionsFetch",
    OptionsFetchSuccess = "@@FileConfiguration/OptionsFetchSuccess",
    OptionsFetchFailed = "@@FileConfiguration/OptionsFetchFailed",

    PushAlert = "@@FileConfiguration/PushAlert",
    ClearAlerts = "@@FileConfiguration/ClearAlerts",
}
