module.exports = {
  async PDFGenerator(req, res) {
    var fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };

    var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);
    var fs = require('fs');

    var docDefinition = {
      compress: true,
      content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
      ],
      defaultStyle: {
        font: 'Helvetica'
      }
    };

    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('document.pdf'));
    // pdfDoc.pipe(res); // Mostra o PDF e não baixa
    pdfDoc.end();

    return res.download('document.pdf') // Baixa o PDF, mas não mostra
  }
}