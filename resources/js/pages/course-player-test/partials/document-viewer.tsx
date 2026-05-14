import { HTMLAttributes, useMemo } from 'react';
import { AlertCircle, Download, ExternalLink } from 'lucide-react';

interface Props extends HTMLAttributes<HTMLDivElement> {
   src: string;
   fileName?: string;
}

type DocumentType = 'pdf' | 'office' | 'image' | 'text' | 'unsupported';

const DocumentViewer = ({ src, fileName, className, ...props }: Props) => {
   const documentInfo = useMemo(() => {
      const getFileExtension = (url: string): string => {
         const urlWithoutQuery = url.split('?')[0];
         const extension = urlWithoutQuery.split('.').pop()?.toLowerCase() || '';
         return extension;
      };

      const getDocumentType = (extension: string): DocumentType => {
         const pdfFormats = ['pdf'];
         const officeFormats = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'odt', 'ods', 'odp'];
         const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
         const textFormats = ['txt', 'rtf', 'csv'];

         if (pdfFormats.includes(extension)) return 'pdf';
         if (officeFormats.includes(extension)) return 'office';
         if (imageFormats.includes(extension)) return 'image';
         if (textFormats.includes(extension)) return 'text';
         return 'unsupported';
      };

      const extension = getFileExtension(src);
      const type = getDocumentType(extension);
      
      return { extension, type };
   }, [src]);

   const renderDocument = () => {
      const baseClassName = "h-full max-h-[calc(100vh-60px)] min-h-[80vh] w-full";
      
      switch (documentInfo.type) {
         case 'pdf':
            return (
               <iframe 
                  src={src} 
                  width="100%" 
                  height="100%" 
                  allowFullScreen 
                  title="PDF Document" 
                  className={baseClassName}
               />
            );
            
         case 'office': {
            // Use Microsoft Office Online Viewer for office documents
            const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;
            return (
               <div className="relative h-full">
                  <iframe 
                     src={officeViewerUrl}
                     width="100%" 
                     height="100%" 
                     allowFullScreen 
                     title={`${documentInfo.extension.toUpperCase()} Document`}
                     className={baseClassName}
                     onError={() => {
                        // Fallback to Google Docs Viewer if Office Online fails
                        const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(src)}&embedded=true`;
                        const iframe = document.querySelector('iframe[src*="officeapps.live.com"]') as HTMLIFrameElement;
                        if (iframe) {
                           iframe.src = googleViewerUrl;
                        }
                     }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                     <a 
                        href={src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/90 hover:bg-white p-2 rounded-md shadow-sm transition-colors"
                        title="Open in new tab"
                     >
                        <ExternalLink className="w-4 h-4 text-gray-600" />
                     </a>
                     <a 
                        href={src} 
                        download={fileName}
                        className="bg-white/90 hover:bg-white p-2 rounded-md shadow-sm transition-colors"
                        title="Download document"
                     >
                        <Download className="w-4 h-4 text-gray-600" />
                     </a>
                  </div>
               </div>
            );
         }
            
         case 'image':
            return (
               <div className="flex items-center justify-center h-full bg-gray-50">
                  <img 
                     src={src} 
                     alt={fileName || 'Document'}
                     className="max-w-full max-h-full object-contain"
                  />
               </div>
            );
            
         case 'text':
            return (
               <iframe 
                  src={src} 
                  width="100%" 
                  height="100%" 
                  title="Text Document" 
                  className={baseClassName}
               />
            );
            
         default:
            return (
               <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-600">
                  <AlertCircle className="w-16 h-16 mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Unsupported Document Format</h3>
                  <p className="text-sm text-center mb-6 max-w-md">
                     This document format (.{documentInfo.extension}) cannot be previewed directly. 
                     You can download it to view with an appropriate application.
                  </p>
                  <div className="flex gap-3">
                     <a 
                        href={src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                     >
                        <ExternalLink className="w-4 h-4" />
                        Open in New Tab
                     </a>
                     <a 
                        href={src} 
                        download={fileName}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                     >
                        <Download className="w-4 h-4" />
                        Download
                     </a>
                  </div>
               </div>
            );
      }
   };

   return (
      <div className={`h-full ${className || ''}`} {...props}>
         {renderDocument()}
      </div>
   );
};

export default DocumentViewer;
