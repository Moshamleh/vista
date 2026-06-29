declare module "nodemailer" {
  export type SendMailOptions = {
    from: string
    to: string
    replyTo?: string
    subject: string
    text?: string
    html?: string
  }

  export type Transporter = {
    sendMail: (options: SendMailOptions) => Promise<unknown>
  }

  const nodemailer: {
    createTransport(options: {
      service: string
      auth: {
        user: string
        pass: string
      }
    }): Transporter
  }

  export default nodemailer
}
