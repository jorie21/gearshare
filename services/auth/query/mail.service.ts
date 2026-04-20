/**
 * Basic Mail Service
 * In production, you would use 'resend', 'nodemailer', or another email provider.
 */
export class MailService {
  /**
   * Sends the 6-digit verification code to the user's email
   */
  static async sendVerificationCode(email: string, code: string) {
    try {
      // LOGGING THE CODE FOR LOCAL DEVELOPMENT
      console.log(`
      -----------------------------------------
      TO: ${email}
      SUBJECT: GearShare Verification Code
      BODY: Your verification code is ${code}
      It expires in 15 minutes.
      -----------------------------------------
      `);

      // In production:
      // await resend.emails.send({
      //   from: "GearShare <no-reply@gearshare.com>",
      //   to: email,
      //   subject: "Verification Code",
      //   text: `Your code is ${code}`,
      // });

      return { success: true, error: null };
    } catch (error) {
      console.error("Error sending verification email:", error);
      return { success: false, error: "Failed to send verification email" };
    }
  }
}
