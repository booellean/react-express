import * as express from 'express';
import {Request, Response} from "express";
import nodemailer from 'nodemailer';
import { check, validationResult } from 'express-validator';

import call from '../_helpers/devCalls';
import config from './../config';

// NOTE: Create your API calls here! (These will be the routes that react call to)

export class ApiController {
  public router: express.Router;

  constructor () {
    this.router = express.Router();
  }

  public routes(app: express.Application): void {
    // NOTE: Override your locals in the Route!

    app.route('/api/articles')
    .get( async (req: Request, res: Response) =>{
      return call.all()
                  .then( (data: CustomObj) =>{
                    return res.json({
                      articles : data
                    })
                  })
                  .catch( (err: CustomObj) =>{
                    return res.json({
                      error : err
                    })
                  })
    });

    app.route('/api/article/:id')
    .get( async (req: Request, res: Response) =>{
      return call.article(req.params.id)
                  .then( (data: CustomObj) =>{
                    return res.json({
                      article : data
                    })
                  })
                  .catch( (err: CustomObj) =>{
                    return res.json({
                      error : err
                    })
                  })
    })

    app.route('/api/contact')
    .post([
        check('data.email')
          .not().isEmpty()
          .isEmail()
          // .normalizeEmail()
          .customSanitizer( (val) =>{
            return val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          }),
        check('data.question')
          .not().isEmpty()
          .isLength({min : 20, max: 500})
          .trim()
          // The regex was taken from user ThiefMaster,
          // Removes all script tags and everything between them. Thanks!
          // https://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
          .customSanitizer( (val) =>{
            return val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          })
          .escape(),
        check('data.name')
          .not().isEmpty()
          .isLength({min : 2, max: 50})
          .customSanitizer( (val) =>{
            return val.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
          })
        ],
      async (req: Request, res: Response) =>{

      const data = req.body.data

      console.log(config.transport_email, config.transport_password);

      // Let's see if the user was being sneaky!!!
      const errors = validationResult(req);

      if(!errors.isEmpty()){
        const returnErrors = {};
        errors.array().forEach( error =>{
          let name = error.param.split('.')[1];
          returnErrors[name] = error.msg;
        });
        return res.json({
          errors : returnErrors
        })
      }

      const transporter = nodemailer.createTransport({
        service: config.transport_service,
        host: config.transport_host,
        port: 465,
        secure: true,
        auth: {
          user: config.transport_email,
          pass: config.transport_password
        }
      });

      const mailOptions = {
        from: `"Contact: ${data.name}" <${config.transport_email}>`,
        to: `"booellean" <${config.transport_email}>`,
        replyTo: `${data.email}`,
        subject: `Question from ${data.name}`,
        html:  '<p>Name: ' + data.name + '</p><p>Email: ' + data.email + '</p>' + data.question,
      };

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.error('there was an error: ', err);
          res.status(401).json({
            error: 'There was a problem submitting your inquiry. Please try again later.'
          });
        } else {
          res.status(200).json({
            success : 'Message has been sent!'
          });
        }
      });
    })
  }
}