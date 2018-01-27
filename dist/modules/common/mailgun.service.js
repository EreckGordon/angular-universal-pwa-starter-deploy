"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
let MailgunService = class MailgunService {
    constructor() {
        this.nodemailerMailgun = nodemailer.createTransport(mg({
            auth: {
                api_key: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_EMAIL_DOMAIN
            }
        }));
    }
    sendPasswordResetEmail({ email, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = `
    		<div>To reset your password for ${process.env.SITENAME_BASE}, please follow this link:
    		<a href="${process.env.SITE_URL}/reset-password/?token=${token}&email=${email}">
    			${process.env.SITE_URL}/reset-password/?email=${email}&token=${token}
    		</a></div><br>

    		<div>
    		The link will expire in 10 minutes.
    		</div>
    	`;
            return yield this.nodemailerMailgun.sendMail({
                to: email,
                from: `noreply@${process.env.MAILGUN_EMAIL_DOMAIN}`,
                subject: `Password Reset Request for ${process.env.SITENAME_BASE}`,
                html
            });
        });
    }
};
MailgunService = __decorate([
    common_1.Component()
], MailgunService);
exports.MailgunService = MailgunService;