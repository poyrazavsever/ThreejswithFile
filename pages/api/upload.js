import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Yükleme sırasında bir hata oluştu.');
      }

      console.log('Files:', files);
      res.status(200).json({ message: 'Dosya bilgileri alındı.', files });

      const oldPath = files.file.filepath;
      const newPath = path.join(uploadDir, files.file.originalFilename);

      fs.rename(oldPath, newPath, (renameErr) => {
        if (renameErr) {
          console.error(renameErr);
          return res.status(500).send('Dosya yeniden adlandırılamadı.');
        }

        res.status(200).send('Dosya başarıyla yüklendi.');
      });
    });
    
  } else {
    res.status(405).send('Yalnızca POST metodu destekleniyor.');
  }
}
