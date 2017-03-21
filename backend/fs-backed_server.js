const dir = '/Users/roshanravi/Desktop/testing-scouting';

fs.watch(dir, {encoding: 'utf8'}, (eventType, filename) => {
    if(eventType == "rename"){
        const filePath = path.join(dir, filename);

        fs.readFile(filePath, {encoding: 'utf8'}, (err, data) => {
          if (err && err.errno == -2) return;
          else if (err) console.error(err);

          console.log(data);

          fs.unlink(filePath, (err) => {
              if (err && err.errno == -2) return;
              else if (err) console.error(err);
          });
        });
   }
});