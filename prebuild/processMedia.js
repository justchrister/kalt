const fs = require('fs');
const path = require('path');
const ffmpegPath = require('ffmpeg-static');
const { exec } = require('child_process');

const videoDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../public/videos/output');


// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdir(videoDir, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach((file, index) => {
    const filePath = path.join(videoDir, file);

    if (path.extname(file) === '.mp4') {
      const baseFilename = path.basename(file, '.mp4');

      fs.copyFileSync(filePath, path.join(outputDir, `${baseFilename}.mp4`));
      const files = [
        {
          fileDirAndName: `${outputDir}/${baseFilename}-poster.jpg`,
          command: `ffmpeg -i "${filePath}" -vf "thumbnail,scale=640:360" -frames:v 1 "${outputDir}/${baseFilename}-poster.jpg"`
        },
        {
          fileDirAndName: `${outputDir}/${baseFilename}-min.mp4`,
          command: `ffmpeg -i "${filePath}" -vcodec libx264 -crf 28 "${outputDir}/${baseFilename}-min.mp4"`
        },
        {
          fileDirAndName: `${outputDir}/${baseFilename}.webm`,
          command: `ffmpeg -i "${filePath}" -c:v libvpx -b:v 1M -c:a libvorbis "${outputDir}/${baseFilename}.webm"`
        },
        {
          fileDirAndName: `${outputDir}/${baseFilename}-min.webm`,
          command: `ffmpeg -i "${filePath}" -c:v libvpx -b:v 500k -c:a libvorbis "${outputDir}/${baseFilename}-min.webm"`
        },
        {
          fileDirAndName: `${outputDir}/${baseFilename}.ogg`,
          command: `ffmpeg -i "${filePath}" -c:v libtheora -q:v 7 -c:a libvorbis -q:a 4 "${outputDir}/${baseFilename}.ogg"`
        },
        {
          fileDirAndName: `${outputDir}/${baseFilename}-min.ogg`,
          command: `ffmpeg -i "${filePath}" -c:v libtheora -q:v 5 -c:a libvorbis -q:a 2 "${outputDir}/${baseFilename}-min.ogg"`
        }
      ]
      for (const file of files){
        if (!fs.existsSync(file.fileDirAndName)) {
          exec(file.command, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing command: ${file.command}`, error);
              return;
            }
            console.log(`Successfully executed: ${file.command}`);
          });
        } else {
          console.log(`File already exists: ${file.fileDirAndName}`);
        }
      }
    }
  });
});