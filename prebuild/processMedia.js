const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const videoDir = path.join(__dirname, '../public/videos');
// in subfolder output
const outputDir = path.join(__dirname, '../public/videos/output');

fs.readdir(videoDir, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach((file, index) => {
    const filePath = path.join(videoDir, file);

    if (path.extname(file) === '.mp4') {
      const baseFilename = path.basename(file, '.mp4');

      const commands = [
        `ffmpeg -i "${filePath}" -vf "thumbnail,scale=640:360" -frames:v 1 "${outputDir}/${baseFilename}-poster.jpg"`,
        `ffmpeg -i "${filePath}" -vcodec libx264 -crf 28 "${outputDir}/${baseFilename}-min.mp4"`,
        `ffmpeg -i "${filePath}" -c:v libvpx -b:v 1M -c:a libvorbis "${outputDir}/${baseFilename}.webm"`,
        `ffmpeg -i "${filePath}" -c:v libvpx -b:v 500k -c:a libvorbis "${outputDir}/${baseFilename}-min.webm"`,
        `ffmpeg -i "${filePath}" -c:v libtheora -q:v 7 -c:a libvorbis -q:a 4 "${outputDir}/${baseFilename}.ogg"`,
        `ffmpeg -i "${filePath}" -c:v libtheora -q:v 5 -c:a libvorbis -q:a 2 "${outputDir}/${baseFilename}-min.ogg"`
      ];

      commands.forEach((command) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing command: ${command}`, error);
            return;
          }
          console.log(`Successfully executed: ${command}`);
        });
      });
    }
  });
});
process.exit(1)