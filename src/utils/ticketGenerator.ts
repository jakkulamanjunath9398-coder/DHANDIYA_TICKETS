import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateTicketQRCode = async (data: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(data, {
      width: 280,
      margin: 1,
      color: {
        dark: '#1e1b4b',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
};

export const downloadTicketPDF = async (
  elementId: string,
  fileName: string = 'Dandiya_Night_2026_Ticket.pdf'
): Promise<boolean> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id ${elementId} not found`);
    return false;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    // Standard ticket size or A4 landscape/portrait
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 190; // A4 is 210mm wide with margins
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 15; // top margin

    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    pdf.save(fileName);
    return true;
  } catch (err) {
    console.error('Error generating PDF ticket', err);
    // Fallback: trigger print dialog if canvas rendering encounters an issue
    window.print();
    return false;
  }
};

export const triggerPrintTicket = () => {
  window.print();
};
