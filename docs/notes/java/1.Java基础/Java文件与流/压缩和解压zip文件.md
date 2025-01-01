---
title: 压缩和解压zip文件
createTime: 2025/01/01 22:50:34
permalink: /notes/java/5l73ltoc/
---
建议使用Apache Commons Compress库，以支持更多压缩格式：

https://commons.apache.org/proper/commons-compress/

## zip文件处理核心API

核心API：

- `java.util.zip.ZipOutputStream`：zip文件输出流，用于压缩操作
- `java.util.zip.ZipInputStream`：zip文件输入流，用于解压操作
- `java.util.zip.ZipEntry`：zip文件实体，代表zip压缩包中的一个文件或目录

## zip压缩

```java
/**
 * 压缩文件
 * @param sourceFilePath 源文件路径
 * @param zipFilePath 目标zip压缩文件路径
 * */
public static void zip(String sourceFilePath, String zipFilePath) throws IOException {
    try(ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFilePath))){
        File fileToZip = new File(sourceFilePath);
        if(fileToZip.isDirectory()) {
            // 如果是目录,则压缩目录
            zipDirectory(fileToZip, fileToZip.getName(), zipOut);
        } else {
            // 如果是文件,则压缩文件
            zipFile(fileToZip, fileToZip.getName(), zipOut);
        }
    }
}

/**
 * 辅助方法: 压缩目录
 * @param fileToZip 待压缩目录
 * @param parentDir 待压缩目录的父目录
 * @param zipOut zip输出流
 * */
private static void zipDirectory(File fileToZip, String parentDir, ZipOutputStream zipOut) throws IOException {
    if(fileToZip.isHidden()) {
        return;
    } else {
        File[] files = fileToZip.listFiles();
        if(files.length == 0) {
            // 如果目录为空,则创建空目录
            ZipEntry zipEntry = new ZipEntry(parentDir + "/");
            zipOut.putNextEntry(zipEntry);
            zipOut.closeEntry();
        } else {
            for(File file : files) {
                if(file.isDirectory()) {
                    // 如果是目录,则递归压缩目录
                    zipDirectory(file, parentDir + "/" + file.getName(), zipOut);
                } else {
                    // 如果是文件,则压缩文件
                    zipFile(file, parentDir + "/" + file.getName(), zipOut);
                }
            }
        }
    }
}

/**
 * 辅助方法: 压缩文件
 * @param fileToZip 待压缩文件
 * @param fileName 待压缩文件名
 * @param zipOut zip输出流
 * */
private static void zipFile(File fileToZip, String fileName, ZipOutputStream zipOut) throws IOException {
    if(fileToZip.isHidden()) {
        return;
    }
    try(FileInputStream fis = new FileInputStream(fileToZip)) {
        ZipEntry zipEntry = new ZipEntry(fileName);
        zipOut.putNextEntry(zipEntry);
        byte[] bytes = new byte[1024];
        int length;
        while((length = fis.read(bytes)) >= 0) {
            zipOut.write(bytes, 0, length);
        }
    }
}
```

## zip解压

```java
/**
 * 解压文件
 * @param zipFilePath 压缩文件
 * @param destDir 解压目录
 * */
public static void unzip(String zipFilePath, String destDir) throws IOException {
    File destDirectory = new File(destDir);
    if(!destDirectory.exists()) {
        destDirectory.mkdirs();
    }

    try (ZipInputStream zipIn = new ZipInputStream(new FileInputStream(zipFilePath))){
        ZipEntry zipEntry = zipIn.getNextEntry();
        while(zipEntry != null) {
            File newFile = new File(destDir + File.separator + zipEntry.getName());
            if(zipEntry.isDirectory()) {
                // 如果是目录,则创建目录
                newFile.mkdirs();
            } else {
                // 如果是文件,则创建文件(解压文件)
                extractFile(zipIn, newFile);
            }
            zipIn.closeEntry();
            zipEntry = zipIn.getNextEntry();
        }
    }
}

/**
 * 辅助方法: 解压文件
 * @param zipIn zip输入流
 * @param file 需要(解压)创建的文件
 * */
private static void extractFile(ZipInputStream zipIn, File file) throws IOException {
    // 创建文件的父目录(防止FileNotFoundException)
    File parentDir = new File(file.getParent());
    if(!parentDir.exists()) {
        parentDir.mkdirs();
    }
    try(BufferedOutputStream fos = new BufferedOutputStream(new FileOutputStream(file))) {
        byte[] buffer = new byte[1024];
        int len;
        while((len = zipIn.read(buffer)) > 0) {
            fos.write(buffer, 0, len);
        }
    }
}
```

