import { createSelector } from "reselect"

const directorySelect = state => state.directory;

export const createSectionsDirectorySelector = createSelector([directorySelect], directory => directory);