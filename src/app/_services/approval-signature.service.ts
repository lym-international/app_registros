import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApprovalSignatureService {

  constructor() {}

  /**
   * Genera un hash SHA-256 a partir de los datos de aprobación.
   * Este hash actúa como "firma" para verificar integridad.
   */
  async generateSignature(data: {
    approveComments: string;
    approvedStatus: boolean;
    approverEmail: string;
    approverName: string;
    approvedDate: string;
  }): Promise<string> {
    // Ordenar las claves para que siempre el hash sea consistente
    const sortedData = JSON.stringify(data, Object.keys(data).sort());

    // Usar la API Web Crypto (disponible en modern browsers)
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(sortedData);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    // Convertir el buffer a string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  }

  /**
   * Verifica si los datos actuales coinciden con la firma guardada.
   * Retorna true si los datos NO fueron modificados.
   */
  async verifySignature(data: {
    approveComments: string;
    approvedStatus: boolean;
    approverEmail: string;
    approverName: string;
    approvedDate: string;
  }, savedSignature: string): Promise<boolean> {
    const currentSignature = await this.generateSignature(data);
    return currentSignature === savedSignature;
  }

  /**
   * Genera un hash SHA-256 a partir del contenido del PDF (ArrayBuffer).
   * Este hash garantiza que el PDF no ha sido modificado.
   */
  async generatePdfSignature(pdfBuffer: ArrayBuffer): Promise<string> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', pdfBuffer);
    
    // Convertir el buffer a string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  /**
   * Verifica si un PDF actual coincide con la firma guardada.
   * Retorna true si el PDF NO fue modificado.
   */
  async verifyPdfSignature(pdfBuffer: ArrayBuffer, savedSignature: string): Promise<boolean> {
    const currentSignature = await this.generatePdfSignature(pdfBuffer);
    return currentSignature === savedSignature;
  }

  /**
   * Genera un hash SHA-256 COMBINADO: PDF + datos de aprobación.
   * Esto garantiza que NADA puede ser modificado (ni el PDF ni los metadatos).
   */
  async generateCombinedSignature(
    pdfBuffer: ArrayBuffer,
    approvalData: {
      approveComments: string;
      approvedStatus: boolean;
      approverEmail: string;
      approverName: string;
      approvedDate: string;
    }
  ): Promise<string> {
    // 1. Calcular hash del PDF
    const pdfHash = await this.generatePdfSignature(pdfBuffer);
    
    // 2. Ordenar y serializar los datos de aprobación
    const sortedData = JSON.stringify(approvalData, Object.keys(approvalData).sort());
    
    // 3. Combinar el hash del PDF + los datos de aprobación
    const combinedString = pdfHash + '|' + sortedData;
    
    // 4. Calcular el hash final de todo
    const encoder = new TextEncoder();
    const combinedBuffer = encoder.encode(combinedString);
    const finalHashBuffer = await crypto.subtle.digest('SHA-256', combinedBuffer);
    
    // 5. Convertir a hexadecimal
    const hashArray = Array.from(new Uint8Array(finalHashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  /**
   * Verifica si el PDF y los datos de aprobación actuales coinciden con la firma guardada.
   * Retorna true si NADA fue modificado.
   */
  async verifyCombinedSignature(
    pdfBuffer: ArrayBuffer,
    approvalData: {
      approveComments: string;
      approvedStatus: boolean;
      approverEmail: string;
      approverName: string;
      approvedDate: string;
    },
    savedSignature: string
  ): Promise<boolean> {
    const currentSignature = await this.generateCombinedSignature(pdfBuffer, approvalData);
    return currentSignature === savedSignature;
  }
}