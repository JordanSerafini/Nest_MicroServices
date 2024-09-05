declare module 'html2pdf.js' {
    interface Html2PdfOptions {
      margin?: number | [number, number] | [number, number, number, number];
      filename?: string;
      image?: { type?: string; quality?: number };
      html2canvas?: object;
      jsPDF?: { unit?: string; format?: string | number[]; orientation?: string };
    }
  
    interface Html2Pdf {
      from(element: HTMLElement): Html2Pdf;
      set(options: Html2PdfOptions): Html2Pdf;
      save(): void;
      outputPdf(format: 'datauristring'): Promise<string>;
    }
  
    const html2pdf: () => Html2Pdf;
    export = html2pdf;
  }
  