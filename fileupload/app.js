const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) { //업로드해서 저장할곳
        done(null, 'uploads/');
        },
        filename(req, file, done) { //업로드할 파일을 어떤 이름으로 올릴지
        const ext = path.extname(file.originalname);
        console.log('ext',ext);
        done(null, path.basename(file.originalname, ext) + Date.now() + ext); //똑같은 이름으로 파일을 올렸을 시에 덮어씌어질 가능성이 있어서 date.now()를 사용
        //done 메소드 파라미터 첫번째에는 실패했을 시의 에러를 넣어주고, 두번째에는 성공했을 경우의 값을 넣어준다.
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 파일 사이즈 5MB이하만 가능 5byte* 1000byte * 1000byte = 5,000,000 byte = 5MB
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname,'/multipart.html'));
});

app.post('/upload', upload.single('image'), (req, res) => { //single메소드의 파라미터 이름은 form태그의 name 프로퍼티의 이름과 같아야한다.
    console.log('req.file',req.file);
    res.send('ok');
});

// app.post('/upload', upload.array('image'), (req, res) => { //array메소드는 '한개의 <input type="file" name="image" />에 '여러개의 파일'을 업로드할때
//     console.log('req.files', req.files, 'req.body', req.body);
//     res.send('ok');
// });

// app.post('upload', upload.fields({ name: 'image1' }, { name: 'image2' }), (req, res) => {
//     //fields 메소드는 '여러개 <input type="file" name="image1" />에 '여러개의 파일'을 업로드할때
//     //                      <input type="file" name="image2" />
//     //                      <input type="file" name="image1" />
//     console.log('req.files.image1', req.files.image1, 'req.body', req.body);
//     res.send('ok');
// });

app.listen(port, () => {
    console.log(port, '번호로 서버작동');
});