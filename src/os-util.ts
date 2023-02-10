import fse from 'fs-extra';
import os from 'os';
import path from 'path';

const { mkdtemp, rm } = fse;
const { tmpdir } = os;
const { join } = path;

// A tiny cache, so we only delete what we have created
let createdTempDirs: string[] = [];

/**
 * Throws when the candidate does not exist in our internal cache.
 *
 * @param candidate The path to check.
 * @returns The index in our internal cache.
 */
const assertExistsInCache = (candidate: string): number => {
  const idx: number = createdTempDirs.indexOf(candidate);
  if (idx === -1) {
    throw new Error(`Expected ${candidate} to exist in cache.`);
  }
  return idx;
};

/**
 * Throws when the candidate exists in our internal cache.
 * @param candidate The path to check.
 */
const assertDoesntExistInCache = (candidate: string): void => {
  const idx: number = createdTempDirs.indexOf(candidate);
  if (idx !== -1) {
    throw new Error(`Expected ${candidate} to not exist in cache, but found it at index ${idx}.`);
  }
};

/**
 * Creates a temporary directory and returns it's full path.
 */
export const getTempDownloadFolder = async () => {
  const tempDir: string = await mkdtemp(join(tmpdir(), 'tmp-crga-'));
  assertDoesntExistInCache(tempDir);
  createdTempDirs.push(tempDir);
  return tempDir;
};

/**
 * Removes a temporary directory including its contents, but only if it was previously
 * created by ourselves.
 *
 * @param tempDir {string} The full path to the directory to remove.
 */
export const removeTempDownloadFolder = async (tempDir: string) => {
  const idx: number = assertExistsInCache(tempDir);
  delete createdTempDirs[idx];
  await rm(tempDir, {recursive: true, force: true});
};
