import fs, {promises as fsPromises} from "fs";

export async function mkdir(path: string, recursive = true): Promise<string> {
  return await fsPromises.mkdir(path, {recursive: recursive});
}
export async function rmdir(path, recursivo = true): Promise<void> {
  return await fsPromises.rm(path, {recursive: recursivo});
}
/**
 * List of subitens, files or sudirectories, of the {path} directory
 * @param path Path to the directory to be read
 * @returns List of names
 */
export async function listDirFiles(path: string): Promise<string[]> {
  return await fsPromises.readdir(path);
}
export async function canRead(path: string): Promise<boolean> {
  try {
    await fsPromises.access(path, fs.constants.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}
export async function canWrite(path: string): Promise<boolean> {
  try {
    await fsPromises.access(path, fs.constants.W_OK);
    return true;
  } catch (e) {
    return false;
  }
}
/**
 * Resolves the path
 * @param path Path to be resolved
 * @returns Absolute path
 */
export async function resolvePath(path: string): Promise<string> {
  return await fsPromises.realpath(path);
}

export async function createFile(path: string, content: string): Promise<void> {
  return await fsPromises.writeFile(path, content);
}

/**
 * Reads the file {path}
 * @param path Path to the file to be read
 * @returns The content of the file
 */
export async function readFile(path: string): Promise<string> {
  return (await fsPromises.readFile(path)).toString();
}

/**
 * Appends {additionalContent} to the file {path}.
 * @param path Path to the file to be modified
 * @param additionalContent
 * @returns
 */
export async function appendFile(
  path: string,
  additionalContent: string
): Promise<void> {
  return await fsPromises.appendFile(path, additionalContent);
}
/**
 * Renames the file {oldPath} to {newPath}
 * @param oldPath Path to be renamed
 * @param newPath New name
 */
export async function renameFile(
  oldPath: string,
  newPath: string
): Promise<void> {
  await fsPromises.rename(oldPath, newPath);
}
/**
 * Delete file {path}
 * @param path Path to the file to be deleted
 * @returns
 */
export async function deleteFile(path: string): Promise<void> {
  return await fsPromises.unlink(path);
}
/**
 * Get info details of the file {path}
 * @param path Path to the file to get details
 * @returns fs.Stats object
 */
export async function stats(path: string): Promise<fs.Stats> {
  return await fsPromises.stat(path);
}
/**
 * Open the file accordingly to the {flags} parameter. If {data} has text, calls the writeFile method, otherwise calls the readFile method.
 * Sobre as flags, em resumo: quando a acompanhada de "+", significa que o arquivo será aberto para ESCRITA e LEITURA;
 * quando estiver acompanhada de "x", significa que, se o arquivo já existir, lançará exceção
 *
 * @param path Path to the file to be read/write
 * @param data Data to be written
 * @param flags flags (a,ax, a+, r, r+, w, w+, x, x+) to open the file. Default 'r'
 */
export async function openFile(
  path: string,
  data: string,
  flags = "r"
): Promise<Buffer | void> {
  const fd = await fsPromises.open(path, flags);
  try {
    if (!data || data == "") {
      return await fsPromises.readFile(fd);
    } else {
      await fsPromises.writeFile(fd, data);
    }
  } finally {
    await fd.close();
  }
}
