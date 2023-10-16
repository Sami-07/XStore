import { NextRequest, NextResponse } from "next/server"
import { options, transporter } from "../../../config/nodemailer"
import { getServerSession } from "next-auth";

function generateEmailContent(body) {
    const { name, email, address, city, state, pincode, phone, amountToBePaid, orderId } = body;

    return {

        html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
        <!--[if gte mso 9]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <title></title>
        <style type="text/css">@media only screen and (min-width:620px){.u-row{width:600px!important}.u-row .u-col{vertical-align:top}.u-row .u-col-50{width:300px!important}.u-row .u-col-100{width:600px!important}}@media(max-width:620px){.u-row-container{max-width:100%!important;padding-left:0!important;padding-right:0!important}.u-row .u-col{min-width:320px!important;max-width:100%!important;display:block!important}.u-row{width:100%!important}.u-col{width:100%!important}.u-col>div{margin:0 auto}}body{margin:0;padding:0}table,tr,td{vertical-align:top;border-collapse:collapse}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors='true']{color:inherit!important;text-decoration:none!important}table,td{color:#000}#u_body a{color:#00e;text-decoration:underline}@media(max-width:480px){#u_content_image_3 .v-text-align{text-align:center!important}#u_content_heading_1 .v-text-align{text-align:center!important}#u_content_image_2 .v-src-width{width:auto!important}#u_content_image_2 .v-src-max-width{max-width:86%!important}#u_content_text_6 .v-container-padding-padding{padding:33px 10px 33px 19px!important}}</style>
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Cabin:400,700" rel="stylesheet" type="text/css">
        <!--<![endif]-->
        </head>
        <body class="clean-body u_body" style="margin:0;padding:0;-webkit-text-size-adjust:100%;background-color:#f9f9f9;color:#000000">
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table id="u_body" style="border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#f9f9f9;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
        <tr style="vertical-align:top">
        <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f9f9f9"><![endif]-->
        <div class="u-row-container" style="padding:0;background-color:transparent">
        <div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent">
        <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="300" style="width:300px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width:320px;min-width:300px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--<![endif]-->
        <table id="u_content_image_3" style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif" align="left">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
        <td class="v-text-align" style="padding-right:0;padding-left:0" align="right">
        <img align="right" border="0" src="https://assets.unlayer.com/projects/190774/1697358777137-Untitled%20design%20(11).png" alt="" title="" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:0;height:auto;float:none;width:17%;max-width:47.6px" width="47.6" class="v-src-width v-src-max-width" />
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="300" style="width:300px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]-->
        <div class="u-col u-col-50" style="max-width:320px;min-width:300px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--<![endif]-->
        <table id="u_content_heading_1" style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif" align="left">
        <h1 class="v-text-align" style="margin:0;line-height:200%;text-align:left;word-wrap:break-word;font-size:22px;font-weight:400">X Store</h1>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div class="u-row-container" style="padding:0;background-color:transparent">
        <div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:transparent">
        <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:transparent"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent;border-radius:0;-webkit-border-radius:0;-moz-border-radius:0">
        <!--<![endif]-->
        <table id="u_content_image_2" style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Cabin',sans-serif" align="left">
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
        <td class="v-text-align" style="padding-right:0;padding-left:0" align="center">
        <img align="center" border="0" src="https://assets.unlayer.com/projects/190774/1697358257245-confirmed%20order.jpg" alt="Image" title="Image" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:inline-block!important;border:0;height:auto;float:none;width:100%;max-width:580px" width="580" class="v-src-width v-src-max-width" />
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div class="u-row-container" style="padding:0;background-color:transparent">
        <div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#fff">
        <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:#fff"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
        <!--<![endif]-->
        <table id="u_content_text_6" style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Cabin',sans-serif" align="left">
        <div class="v-text-align" style="font-size:14px;line-height:160%;text-align:left;word-wrap:break-word">
        <p style="font-size:14px;line-height:160%"><span style="font-size:18px;line-height:28.8px"><span style="line-height:22.4px">Dear ${name},</span></span>
        </p>
        <p style="line-height:160%"><span style="font-size:18px;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:28.8px">We are excited to confirm your recent order with X Store.</span></p>
        <p style="line-height:160%"><span style="font-size:18px;line-height:28.8px"><strong><span style="font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Your Order ID is: ${orderId}</span></strong>
        </span>
        </p>
        <p style="line-height:160%">&nbsp;</p>
        <p style="line-height:160%"><strong><span style="font-size:16px;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:25.6px">Shipping Address</span></strong></p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Name: ${name}</span></p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Email: ${email}</span></p>
        <p style="line-height:160%">&nbsp;</p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Phone Number: ${phone}</span></p>
        <p style="line-height:160%">&nbsp;</p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Address: ${address}</span></p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">City: ${city}</span></p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">State: ${state}</span></p>
        <p style="line-height:160%"><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Pincode: ${pincode}</span></p>
        <p style="line-height:160%"><strong><span style="font-size:11pt;font-family:Arial,sans-serif;color:#000;white-space-collapse:preserve;line-height:22.4px">Order Total : ${amountToBePaid} </span></strong></p>


        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <table style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif" align="left">
        <!--[if mso]><style>.v-button{background:transparent!important}</style><![endif]-->
        <div class="v-text-align" align="center">
        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:46px;v-text-anchor:middle;width:165px" arcsize="8.5%" stroke="f" fillcolor="#891dda"><w:anchorlock/><center style="color:#FFFFFF"><![endif]-->
        <a href="${process.env.NEXT_PUBLIC_HOST}/order?orderid=${orderId}" target="_blank" class="v-button" style="box-sizing:border-box;display:inline-block;text-decoration:none;-webkit-text-size-adjust:none;text-align:center;color:#fff;background-color:#891dda;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;width:auto;max-width:100%;overflow-wrap:break-word;word-break:break-word;word-wrap:break-word;mso-border-alt:none;font-size:14px">
        <span style="display:block;padding:14px 44px 13px;line-height:120%"><span style="font-size:16px;line-height:19.2px"><strong><span style="line-height:19.2px;font-size:16px">View Order</span></strong>
        </span>
        </span>
        </a>
        <!--[if mso]></center></v:roundrect><![endif]-->
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <table style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:'Cabin',sans-serif" align="left">
        <div class="v-text-align" style="font-size:14px;line-height:160%;text-align:center;word-wrap:break-word">
        <p style="line-height:160%;font-size:14px"><span style="font-size:18px;line-height:28.8px">Thank You,</span></p>
        <p style="line-height:160%;font-size:14px"><span style="font-size:18px;line-height:28.8px">Team X Store</span></p>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div class="u-row-container" style="padding:0;background-color:transparent">
        <div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#e5eaf5">
        <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:#e5eaf5"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
        <!--<![endif]-->
        <table style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Cabin',sans-serif" align="left">
        <div class="v-text-align" style="font-size:14px;color:#891dda;line-height:160%;text-align:center;word-wrap:break-word">
        <p style="font-size:14px;line-height:160%"><span style="font-size:20px;line-height:32px"><strong>Reach Us</strong></span></p>
        <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000">+91 7989487552</span></p>
        <p style="font-size:14px;line-height:160%"><span style="font-size:16px;line-height:25.6px;color:#000">s.a.sami359359@gmail.com</span></p>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <table style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Cabin',sans-serif" align="left">
        <div align="center">
        <div style="display:table;max-width:146px">
        <!--[if (mso)|(IE)]><table width="146" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0;width:146px"><tr><![endif]-->
        <!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:17px" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:17px">
        <tbody>
        <tr style="vertical-align:top">
        <td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
        <a href="https://www.linkedin.com/in/shaikh-abdul-sami-879287211/" title="LinkedIn" target="_blank">
        <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/linkedin.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:0;height:auto;float:none;max-width:32px!important">
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:17px" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:17px">
        <tbody>
        <tr style="vertical-align:top">
        <td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
        <a href="https://www.instagram.com/ig_sami7/" title="Instagram" target="_blank">
        <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:0;height:auto;float:none;max-width:32px!important">
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]><td width="32" style="width:32px;padding-right:0" valign="top"><![endif]-->
        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width:32px!important;height:32px!important;display:inline-block;border-collapse:collapse;table-layout:fixed;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;margin-right:0">
        <tbody>
        <tr style="vertical-align:top">
        <td align="left" valign="middle" style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
        <a href="https://twitter.com/sami73010" title="X" target="_blank">
        <img src="https://cdn.tools.unlayer.com/social/icons/circle-black/x.png" alt="X" title="X" width="32" style="outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:0;height:auto;float:none;max-width:32px!important">
        </a>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <div class="u-row-container" style="padding:0;background-color:transparent">
        <div class="u-row" style="margin:0 auto;min-width:320px;max-width:600px;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;background-color:#891dda">
        <div style="border-collapse:collapse;display:table;width:100%;height:100%;background-color:transparent">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:0;background-color:transparent" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr style="background-color:#891dda"><![endif]-->
        <!--[if (mso)|(IE)]><td align="center" width="600" style="width:600px;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent" valign="top"><![endif]-->
        <div class="u-col u-col-100" style="max-width:320px;min-width:600px;display:table-cell;vertical-align:top">
        <div style="height:100%;width:100%!important">
        <!--[if (!mso)&(!IE)]><!-->
        <div style="box-sizing:border-box;height:100%;padding:0;border-top:0 solid transparent;border-left:0 solid transparent;border-right:0 solid transparent;border-bottom:0 solid transparent">
        <!--<![endif]-->
        <table style="font-family:'Cabin',sans-serif" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
        <tbody>
        <tr>
        <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Cabin',sans-serif" align="left">
        <div class="v-text-align" style="font-size:14px;color:#fafafa;line-height:180%;text-align:center;word-wrap:break-word">
        <p style="font-size:14px;line-height:180%"><span style="font-size:16px;line-height:28.8px">Copyrights © X Store All Rights Reserved</span></p>
        </div>
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if (!mso)&(!IE)]><!-->
        </div>
        <!--<![endif]-->
        </div>
        </div>
        <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
        </div>
        </div>
        </div>
        <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
        </td>
        </tr>
        </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
        </body>
        </html>`
    }
}
export async function POST(req, res) {
    const body = await req.json();
    const session = await getServerSession();
    if (session.user.email === body.email) {
        if (req.method === "POST") {
            try {
                await transporter.sendMail({
                    ...options,
                    from: "Team X Store",
                    to: body.email,

                    ...generateEmailContent(body),
                    subject: "Your Order is Confirmed!"
                })
            
                return new NextResponse(JSON.stringify({ msg: "SUCCESS" }))
            }
            catch (err) {
               
                return new NextResponse({ err: err.message });
            }
        }
        else {
            return new NextResponse("Method Not sasaa Allowed", { status: 405 });
        }
    }
    else {
        return new NextResponse("Method Not sasaa Allowed", { status: 405 });
    }

}
