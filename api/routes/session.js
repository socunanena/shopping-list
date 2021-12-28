import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';

const CLIENT_ID = '855452335775-v6r8utlltr1kcln9g6v9h4vh5v732udj.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const router = Router();

router.post('/social-login/google', (req, res) => {

  console.log('REQ PARAMS', req.body)

  client.getToken(req.body.code).then(tokens => console.log({tokens}))

  // axios.post('https://oauth2.googleapis.com/token', {
  //   code: req.body.code,
  //   code: req.body.client_id,
  // });

  res.send('nye')

});

router.get('/auth/user', (req, res) => {
  res.json({
    name: 'Natàlia',
  });
});

export default router;
