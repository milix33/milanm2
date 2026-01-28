import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Email configuration
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com'
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587')
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const MAIL_TO = process.env.MAIL_TO || 'milan.milincic1990@gmail.com'

interface QuoteData {
  projectType: string
  formData: Record<string, any>
  submittedAt: string
}

function formatFormDataForEmail(formData: Record<string, any>, projectType: string): string {
  let emailBody = `NOVI ZAHTEV ZA PONUDU\n\n`
  emailBody += `Tip projekta: ${getProjectTypeLabel(projectType)}\n`
  emailBody += `Datum i vreme: ${new Date().toLocaleString('sr-RS')}\n\n`
  emailBody += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`

  const fields = Object.entries(formData)
  
  for (const [key, value] of fields) {
    if (value === null || value === undefined || value === '') continue
    if (value instanceof File || (Array.isArray(value) && value[0] instanceof File)) continue

    const label = formatFieldLabel(key)
    
    if (Array.isArray(value)) {
      emailBody += `${label}: ${value.join(', ')}\n`
    } else if (typeof value === 'object') {
      emailBody += `${label}: ${JSON.stringify(value, null, 2)}\n`
    } else {
      emailBody += `${label}: ${value}\n`
    }
  }

  return emailBody
}

function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    house: 'Kuća (novogradnja)',
    building: 'Zgrada (stambeno-poslovni)',
    commercial: 'Poslovni objekat',
    interior: 'Enterijer',
    reconstruction: 'Rekonstrukcija/adaptacija',
    visualization: 'Samo 3D vizualizacija',
  }
  return labels[type] || type
}

function formatFieldLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const dataStr = formData.get('data') as string
    
    if (!dataStr) {
      return NextResponse.json({ error: 'Missing form data' }, { status: 400 })
    }

    const quoteData: QuoteData = JSON.parse(dataStr)
    const projectType = quoteData.projectType
    const formFields = quoteData.formData

    // Extract files
    const attachments: Array<{ filename: string; content: Buffer; contentType?: string }> = []
    
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('file_') && value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer())
        attachments.push({
          filename: value.name,
          content: buffer,
          contentType: value.type || undefined,
        })
      }
    }

    const contactEmail = formFields.email || formFields.contactEmail || ''
    const textBody = formatFormDataForEmail(formFields, projectType)
    
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background: #c9a961; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
            .section-title { font-size: 18px; font-weight: bold; color: #c9a961; margin-bottom: 10px; border-bottom: 2px solid #c9a961; padding-bottom: 5px; }
            .attachments { background: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Novi zahtev za ponudu</h1>
              <p>Tip projekta: <strong>${getProjectTypeLabel(projectType)}</strong></p>
              <p>Datum: ${new Date().toLocaleString('sr-RS')}</p>
            </div>
            <div class="content">
              <div class="section-title">Detalji projekta</div>
              <pre style="background: white; padding: 15px; border-radius: 4px; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${textBody.replace(/\n/g, '<br>')}</pre>
              ${attachments.length > 0 ? `
              <div class="attachments">
                <strong>Priloženi fajlovi:</strong> ${attachments.length} fajl(ova)
                <ul style="margin-top: 10px;">
                  ${attachments.map(att => `<li>${att.filename}</li>`).join('')}
                </ul>
              </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `

    const subject = `[UPIT] ${getProjectTypeLabel(projectType)} - ${new Date().toLocaleDateString('sr-RS')}`

    if (!SMTP_USER || !SMTP_PASS) {
      console.error('SMTP not configured')
      return NextResponse.json({ error: 'Email servis nije konfigurisan.' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"M² Architecture" <${SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: contactEmail || undefined,
      subject,
      text: textBody,
      html: htmlBody,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    return NextResponse.json({
      success: true,
      message: 'Vaš upit je uspješno poslan. Kontaktiraćemo vas u najkraćem mogućem roku.',
    })
  } catch (error: any) {
    console.error('Quote API error:', error)
    return NextResponse.json(
      { error: 'Došlo je do greške prilikom slanja upita. Molimo pokušajte ponovo.' },
      { status: 500 }
    )
  }
}