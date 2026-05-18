import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SharedData } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { AlertTriangle, ChevronDown, ChevronUp, Copy, ExternalLink, QrCode } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

type QrTargetMode = 'overview' | 'player' | 'custom';
type PosterLayout = 'warning' | 'catalog';
type ExportPreset = 'sticker';

const defaultBrandLogo = '/assets/logos/rubyshop-no-bg-removebg-preview.png';

const rubyShopHighlights = ['Airless Sprayer', 'Wall Cutter / Chaser', 'Mortar Sprayer', 'Skim Coat Machine', 'Sandpaper & Spare Parts', 'Waterproof Injection'];

const rubyShopContact = {
   address: '97/60 โกสุมรวมใจ ซ. 39 แขวงดอนเมือง ดอนเมือง กรุงเทพมหานคร 10210',
   phone: '089-666-7802',
   hours: 'จันทร์-เสาร์ 08:30-17:30 น.',
};

interface CourseQrPosterProps extends SharedData {
   course: Course;
   watchHistory: WatchHistory | null;
}

const CourseQrPoster = () => {
   const { props } = usePage<CourseQrPosterProps>();
   const { course, watchHistory, system } = props;

   const [targetMode, setTargetMode] = useState<QrTargetMode>(!!watchHistory ? 'player' : 'overview');
   const [posterLayout, setPosterLayout] = useState<PosterLayout>('warning');
   const [customUrl, setCustomUrl] = useState('');
   const [posterTitle, setPosterTitle] = useState('SCAN TO OPEN');
   const [posterNote, setPosterNote] = useState('Open this course on your phone');
   const [previewOpen, setPreviewOpen] = useState(false);
   const [showSettings, setShowSettings] = useState(false);

   const overviewUrl = useMemo(() => absoluteUrl(route('course.details', { slug: course.slug, id: course.id })), [course.id, course.slug]);

   const playerUrl = useMemo(() => {
      if (!watchHistory) return overviewUrl;

      return absoluteUrl(
         route('course.player', {
            type: watchHistory.current_watching_type,
            watch_history: watchHistory.id,
            lesson_id: watchHistory.current_watching_id,
         }),
      );
   }, [overviewUrl, watchHistory]);

   const resolvedUrl = useMemo(() => {
      if (targetMode === 'player') return playerUrl;
      if (targetMode === 'custom') return customUrl.trim();
      return overviewUrl;
   }, [customUrl, overviewUrl, playerUrl, targetMode]);

   const qrUrl = resolvedUrl ? `https://quickchart.io/qr?size=320&margin=1&text=${encodeURIComponent(resolvedUrl)}` : '';
   const canUsePlayer = !!watchHistory;

   const posterExport = useMemo(() => ({
      courseTitle: course.title,
      categoryTitle: course.course_category?.title || 'Course access',
      childTitle: course.course_category_child?.title || '',
      posterTitle,
      posterNote,
      resolvedUrl,
      layout: posterLayout,
      targetMode,
      brandName: system.fields.name || 'RubyShop',
      brandLogo: system.fields.logo_light || system.fields.logo_dark || defaultBrandLogo,
      qrUrl,
   }), [course, system, posterTitle, posterNote, resolvedUrl, posterLayout, targetMode, qrUrl]);

   const [previewSvgUrl, setPreviewSvgUrl] = useState('');

   useEffect(() => {
      if (!resolvedUrl) {
         setPreviewSvgUrl('');
         return;
      }
      let cancelled = false;
      (async () => {
         const [brandLogo, qrDataUrl] = await Promise.all([
            inlineImageAsDataUrl(posterExport.brandLogo),
            inlineImageAsDataUrl(posterExport.qrUrl),
         ]);
         if (cancelled) return;
         const svg = buildPosterSvg({
            ...posterExport,
            brandLogo: brandLogo || posterExport.brandLogo,
            qrUrl: qrDataUrl || posterExport.qrUrl,
         });
         setPreviewSvgUrl(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
      })();
      return () => { cancelled = true; };
   }, [posterExport, resolvedUrl]);

   const copyUrl = async () => {
      if (!resolvedUrl) return;

      try {
         await navigator.clipboard.writeText(resolvedUrl);
         toast.success('URL copied to clipboard.');
      } catch {
         toast.error('Unable to copy URL.');
      }
   };

   const downloadPosterSvg = () => {
      if (!resolvedUrl) return;

      const svg = buildPosterSvg(posterExport);
      const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slugify(posterExport.courseTitle)}-rubyshop-poster.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Poster SVG downloaded.');
   };

   const downloadPosterImage = async (format: 'png' | 'jpeg') => {
      if (!resolvedUrl) return;

      let stage = 'init';

      try {
         const preset = EXPORT_PRESET;
         stage = 'inline assets';
         const [brandLogo, qrDataUrl] = await Promise.all([inlineImageAsDataUrl(posterExport.brandLogo), inlineImageAsDataUrl(posterExport.qrUrl)]);
         const svg = buildPosterSvg({
            ...posterExport,
            brandLogo: brandLogo || posterExport.brandLogo,
            qrUrl: qrDataUrl || posterExport.qrUrl,
         });

         stage = 'load svg';
         const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
         const svgObjectUrl = URL.createObjectURL(svgBlob);
         const image = await loadImage(svgObjectUrl);
         URL.revokeObjectURL(svgObjectUrl);

         stage = 'render canvas';
         const renderWidth = Math.round(preset.width * preset.scale);
         const renderHeight = Math.round(preset.height * preset.scale);
         const canvas = document.createElement('canvas');
         canvas.width = renderWidth;
         canvas.height = renderHeight;
         const context = canvas.getContext('2d');
         if (!context) throw new Error('Unable to create canvas context');

         context.fillStyle = '#ffffff';
         context.fillRect(0, 0, canvas.width, canvas.height);
         context.imageSmoothingEnabled = true;
         context.imageSmoothingQuality = 'high';
         context.drawImage(image, 0, 0, canvas.width, canvas.height);

         stage = 'encode image';
         const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, format === 'jpeg' ? 'image/jpeg' : 'image/png', format === 'jpeg' ? 0.96 : undefined));
         if (!blob) {
            toast.error(`Unable to export ${format.toUpperCase()}.`);
            return;
         }

         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = `${slugify(posterExport.courseTitle)}-${preset.filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
         URL.revokeObjectURL(url);
         toast.success(`Poster ${format.toUpperCase()} downloaded.`);
      } catch (error) {
         console.error(`Poster export ${format.toUpperCase()} failed at ${stage}`, error);
         const message = error instanceof Error ? error.message : 'Unknown export error';
         toast.error(`Unable to export ${format.toUpperCase()} at ${stage}: ${message}`);
      }
   };

   const printPoster = () => {
      if (!resolvedUrl) return;

      const svg = buildPosterSvg(posterExport);
      const popup = window.open('', '_blank', 'width=1200,height=1600');

      if (!popup) {
         toast.error('Unable to open print preview.');
         return;
      }

      popup.document.open();
      popup.document.write(`<!doctype html>
         <html>
            <head>
               <title>${escapeXml(posterExport.courseTitle)} - RubyShop Poster</title>
               <meta name="viewport" content="width=device-width, initial-scale=1" />
               <style>
                  @page { size: 60mm 92mm portrait; margin: 0; }
                  html, body {
                     margin: 0;
                     padding: 0;
                     width: 60mm;
                     height: 92mm;
                     background: #fff;
                     overflow: hidden;
                     -webkit-print-color-adjust: exact;
                     print-color-adjust: exact;
                  }
                  body {
                     display: block;
                  }
                  .print-sheet {
                     width: 60mm;
                     height: 92mm;
                     overflow: hidden;
                     page-break-after: avoid;
                     break-inside: avoid;
                  }
                  svg {
                     width: 100%;
                     height: 100%;
                     display: block;
                  }
               </style>
            </head>
            <body><div class="print-sheet">${svg}</div><script>setTimeout(function(){ window.focus(); window.print(); }, 400);</script></body>
         </html>`);
      popup.document.close();
      toast.success('Print preview opened.');
   };

   return (
      <Card className="border-border/60 bg-background p-4 sm:p-6">
         <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1">
               <h3 className="text-lg font-semibold">Course QR Poster</h3>
               <p className="text-muted-foreground text-sm">Generate a RubyShop-style poster for the course overview, current player link, or any custom URL.</p>
            </div>

            <div className="flex flex-wrap gap-2">
               <Button type="button" variant="outline" size="sm" onClick={copyUrl} disabled={!resolvedUrl}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy URL
               </Button>
               {resolvedUrl ? (
                  <Button type="button" size="sm" asChild>
                     <a href={resolvedUrl} target="_blank" rel="noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open target
                     </a>
                  </Button>
               ) : (
                  <Button type="button" size="sm" disabled>
                     <ExternalLink className="mr-2 h-4 w-4" />
                     Open target
                  </Button>
               )}
            </div>
         </div>

         <div className="space-y-4">
            {/* Toggle button */}
            <button
               type="button"
               onClick={() => setShowSettings((v) => !v)}
               className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm transition-colors"
            >
               {showSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
               {showSettings ? 'Hide settings' : 'Show settings'}
            </button>

            {/* Collapsible settings */}
            {showSettings && (
               <div className="space-y-4">
                  <div className="space-y-2">
                     <Label>Target</Label>
                     <Select value={targetMode} onValueChange={(value) => setTargetMode(value as QrTargetMode)}>
                        <SelectTrigger>
                           <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="overview">Course overview</SelectItem>
                           <SelectItem value="player" disabled={!canUsePlayer}>
                              Current player link
                           </SelectItem>
                           <SelectItem value="custom">Custom URL</SelectItem>
                        </SelectContent>
                     </Select>
                     {!canUsePlayer && <p className="text-muted-foreground text-xs">Player link needs a watch history. Overview is safer for public posters.</p>}
                  </div>

                  <div className="space-y-2">
                     <Label>Poster Layout</Label>
                     <Select value={posterLayout} onValueChange={(value) => setPosterLayout(value as PosterLayout)}>
                        <SelectTrigger>
                           <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="warning">Warning poster</SelectItem>
                           <SelectItem value="catalog">Catalog poster</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  {targetMode === 'custom' && (
                     <div className="space-y-2">
                        <Label>Custom URL</Label>
                        <Input value={customUrl} onChange={(e) => setCustomUrl(e.target.value)} placeholder="https://example.com/your-link" />
                     </div>
                  )}

                  <div className="space-y-2">
                     <Label>Poster Title</Label>
                     <Input value={posterTitle} onChange={(e) => setPosterTitle(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                     <Label>Poster Note</Label>
                     <Textarea value={posterNote} onChange={(e) => setPosterNote(e.target.value)} rows={3} />
                  </div>

                  <div className="space-y-3 rounded-lg border bg-muted/20 p-3">
                     <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1">
                           <Label>Export</Label>
                           <p className="text-muted-foreground text-xs">Sticker size is fixed for print and downloads.</p>
                        </div>
                        <div className="rounded-md border border-border/60 bg-background px-3 py-2 text-sm font-medium">
                           Sticker
                        </div>
                     </div>

                     <div className="grid gap-2 sm:grid-cols-2">
                        <Button type="button" variant="outline" size="sm" onClick={printPoster} disabled={!resolvedUrl} className="w-full justify-start">
                           Print
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={downloadPosterSvg} disabled={!resolvedUrl} className="w-full justify-start">
                           Download SVG
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => downloadPosterImage('png')} disabled={!resolvedUrl} className="w-full justify-start">
                           Download PNG
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => downloadPosterImage('jpeg')} disabled={!resolvedUrl} className="w-full justify-start">
                           Download JPG
                        </Button>
                     </div>
                  </div>
               </div>
            )}

            <div className="rounded-lg border bg-muted/10 p-4">
               <div className="space-y-1">
                  <p className="font-medium">Poster Preview</p>
                  <p className="text-muted-foreground text-xs">Open the full QR poster in a modal to view, print, or download it.</p>
               </div>
               <Button type="button" className="mt-3 w-full justify-start" onClick={() => setPreviewOpen(true)} disabled={!resolvedUrl}>
                  Open poster preview
               </Button>
            </div>
         </div>

         <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogContent className="max-h-[95vh] max-w-[480px] overflow-hidden p-0 sm:max-w-[480px]">
               <div className="flex max-h-[95vh] flex-col">
                  <DialogHeader className="border-b px-6 py-4 text-left">
                     <DialogTitle>Poster Preview</DialogTitle>
                     <DialogDescription>View the RubyShop QR poster, then print or download it.</DialogDescription>
                  </DialogHeader>

                  <div className="flex-1 overflow-auto bg-neutral-100 p-4">
                     <div className="mx-auto w-full max-w-[380px]">
                        {previewSvgUrl ? (
                           <img src={previewSvgUrl} alt="Poster preview" className="h-auto w-full rounded-2xl shadow-md" />
                        ) : (
                           <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-black/20 text-sm text-black/40">
                              Add a URL to preview poster
                           </div>
                        )}
                     </div>
                  </div>

                  <div className="border-t bg-background px-6 py-4">
                     <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-muted-foreground text-xs">Use the buttons below to export the current poster layout.</p>
                        <div className="flex flex-wrap gap-2">
                           <Button type="button" variant="outline" size="sm" onClick={printPoster} disabled={!resolvedUrl}>
                              Print
                           </Button>
                           <Button type="button" variant="outline" size="sm" onClick={downloadPosterSvg} disabled={!resolvedUrl}>
                              Download SVG
                           </Button>
                           <Button type="button" variant="outline" size="sm" onClick={() => downloadPosterImage('png')} disabled={!resolvedUrl}>
                              Download PNG
                           </Button>
                           <Button type="button" variant="outline" size="sm" onClick={() => downloadPosterImage('jpeg')} disabled={!resolvedUrl}>
                              Download JPG
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </DialogContent>
         </Dialog>
      </Card>
   );
};

const WarningPoster = ({
   course,
   system,
   posterTitle,
   posterNote,
   qrUrl,
   resolvedUrl,
   targetMode,
}: {
   course: Course;
   system: SharedData['system'];
   posterLayout: PosterLayout;
   posterTitle: string;
   posterNote: string;
   qrUrl: string;
   resolvedUrl: string;
   targetMode: QrTargetMode;
}) => {
   const items = [
      posterNote,
      course.course_category?.title
         ? `${course.course_category.title}${course.course_category_child?.title ? ` • ${course.course_category_child.title}` : ''}`
         : 'General course access',
      targetMode === 'player' ? 'Opens the lesson player directly on your device' : 'Opens the public course overview page',
      'Scan with any smartphone camera — no app required',
      `${rubyShopContact.phone} • ${rubyShopContact.hours}`,
   ];

   return (
      <div className="w-full overflow-hidden rounded-[20px] border-[3px] border-black bg-[#ffd633] shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
         {/* Red header with diagonal stripes */}
         <div className="relative overflow-hidden bg-[#d61f1f] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
               {system.fields.logo_light ? (
                  <img src={system.fields.logo_light} alt={system.fields.name || 'RubyShop'} className="h-8 w-auto object-contain" />
               ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20">
                     <QrCode className="h-5 w-5" />
                  </div>
               )}
               <div className="leading-none">
                  <p className="text-sm font-black tracking-[0.24em]">RUBYSHOP</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/80">Airless Sprayer and Power Tools</p>
               </div>
            </div>
            <div
               className="absolute inset-y-0 right-0 w-28"
               style={{ background: 'repeating-linear-gradient(45deg, #111 0px, #111 9px, transparent 9px, transparent 18px)', opacity: 0.55 }}
            />
         </div>

         {/* WARNING banner */}
         <div className="mx-4 mt-4 flex items-center gap-3 rounded-2xl bg-black px-5 py-4">
            <AlertTriangle className="h-9 w-9 shrink-0 text-[#ffd633]" />
            <p className="text-4xl font-black tracking-widest text-[#ffd633]">{posterTitle}</p>
         </div>

         {/* Bullet items */}
         <div className="mx-4 mt-4">
            {items.map((item, i) => (
               <div key={i}>
                  <div className="flex items-start gap-4 py-3">
                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white">
                        <span className="text-sm font-black">{i + 1}</span>
                     </div>
                     <p className="pt-2 text-sm font-bold leading-snug text-black">{item}</p>
                  </div>
                  {i < items.length - 1 && <div className="border-t border-dashed border-black/30" />}
               </div>
            ))}
         </div>

         {/* QR card */}
         <div className="mx-4 mb-5 mt-4 flex items-center justify-center rounded-2xl bg-white p-4">
            {qrUrl ? (
               <img src={qrUrl} alt="Course QR code" className="h-56 w-56 rounded-xl" crossOrigin="anonymous" />
            ) : (
               <div className="flex h-40 w-40 items-center justify-center rounded-xl border border-dashed border-black/30 text-xs text-black/50">
                  QR code
               </div>
            )}
         </div>
      </div>
   );
};

const CatalogPoster = ({
   course,
   system,
   posterNote,
   qrUrl,
   resolvedUrl,
   targetMode,
}: {
   course: Course;
   system: SharedData['system'];
   posterNote: string;
   qrUrl: string;
   resolvedUrl: string;
   targetMode: QrTargetMode;
}) => (
   <div className="overflow-hidden rounded-[28px] border-[3px] border-black bg-[#f6c51a] shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
      <div className="bg-black px-5 py-3 text-white">
         <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d61f1f] text-white">
                  <QrCode className="h-6 w-6" />
               </div>
               <div>
                  <p className="text-sm font-black tracking-[0.24em] text-[#ffd633]">RUBYSHOP CATALOG</p>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/70">Construction equipment and industrial power tools</p>
               </div>
            </div>

            {system.fields.logo_light ? <img src={system.fields.logo_light} alt={system.fields.name || 'RubyShop'} className="h-9 w-auto object-contain" /> : null}
         </div>
      </div>

      <div className="px-5 pb-5 pt-4">
         <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_270px]">
            <div className="space-y-4">
               <div className="rounded-[24px] border-[3px] border-black bg-[#ffe56f] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/60">Featured categories</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                     {rubyShopHighlights.map((item) => (
                        <span key={item} className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold text-black shadow-[0_6px_12px_rgba(0,0,0,0.12)]">
                           {item}
                        </span>
                     ))}
                  </div>
               </div>

               <div className="grid gap-2 sm:grid-cols-2">
                  <PosterBadge title="Target" value={targetMode === 'player' ? 'Current player session' : targetMode === 'custom' ? 'Custom URL' : 'Course overview'} />
                  <PosterBadge title="Scan note" value={posterNote} />
               </div>

               <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                  <PosterInfoBox title="Address" value={rubyShopContact.address} />
                  <PosterInfoBox title="Phone" value={rubyShopContact.phone} />
                  <PosterInfoBox title="Hours" value={rubyShopContact.hours} />
               </div>
            </div>

            <div className="rounded-[22px] border-[3px] border-black bg-white p-3 text-center shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
               <div className="rounded-[18px] bg-[#111] px-3 py-3 text-[#ffd633]">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/75">Scan to open</p>
                  <p className="mt-1 text-[22px] font-black leading-tight">{course.title}</p>
               </div>

               <div className="mt-3 rounded-[18px] border-2 border-black bg-[#f6f2e8] p-2">
                  {qrUrl ? (
                     <img src={qrUrl} alt="Course QR code" className="mx-auto h-[320px] w-[320px] rounded-xl bg-white p-1" crossOrigin="anonymous" />
                  ) : (
                     <div className="mx-auto flex h-[244px] w-[244px] items-center justify-center rounded-xl border border-dashed border-black/40 bg-white text-sm text-black/70">
                        Add a URL to preview QR
                     </div>
                  )}
               </div>

               <div className="mt-3 rounded-xl bg-[#111] px-3 py-2 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#ffd633]">Target URL</p>
                  <p className="mt-1 break-all text-xs font-mono text-white/85">{resolvedUrl || 'No URL selected'}</p>
               </div>
            </div>
         </div>
      </div>

      <div className="border-t-[3px] border-black bg-[#d61f1f] px-5 py-4 text-white">
         <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
               <p className="text-sm font-semibold">{system.fields.name || 'RubyShop'}</p>
               <p className="text-[10px] uppercase tracking-[0.2em] text-white/80">Open the course overview or player directly by QR</p>
            </div>
            <div className="rounded-full border border-black/30 bg-[#ffd633] px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] text-black">
               {targetMode === 'player' ? 'Player QR' : targetMode === 'custom' ? 'Custom QR' : 'Overview QR'}
            </div>
         </div>
      </div>
   </div>
);

const PosterBullet = ({ text }: { text: string }) => (
   <div className="flex items-start gap-2">
      <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-black" />
      <span>{text}</span>
   </div>
);

const PosterBadge = ({ title, value }: { title: string; value: string }) => (
   <div className="rounded-2xl border-2 border-black bg-white px-4 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">{title}</p>
      <p className="mt-1 text-sm font-bold leading-snug text-black">{value}</p>
   </div>
);

const PosterInfoBox = ({ title, value }: { title: string; value: string }) => (
   <div className="rounded-2xl border-2 border-black bg-[#fff6bf] px-3 py-3 shadow-[0_8px_18px_rgba(0,0,0,0.12)]">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/50">{title}</p>
      <p className="mt-1 text-xs font-semibold leading-relaxed text-black">{value}</p>
   </div>
);

const buildPosterSvg = (props: {
   courseTitle: string;
   categoryTitle: string;
   childTitle: string;
   posterTitle: string;
   posterNote: string;
   resolvedUrl: string;
   layout: PosterLayout;
   targetMode: QrTargetMode;
   brandName: string;
   brandLogo: string;
   qrUrl: string;
}) => {
   const width = props.layout === 'catalog' ? 1080 : 1024;
   const height = props.layout === 'catalog' ? 1500 : 1448;
   const renderWidth = width;
   const renderHeight = height;
   const category = props.childTitle ? `${props.categoryTitle} • ${props.childTitle}` : props.categoryTitle;
   const courseLines = splitLines(props.courseTitle, props.layout === 'catalog' ? 22 : 18);
   const urlLines = splitLines(props.resolvedUrl, 28);
   const noteLines = splitLines(props.posterNote, props.layout === 'catalog' ? 18 : 24);

   // Warning poster items
   const warningItems = [
      props.posterNote || 'Open this course on your phone',
      props.targetMode === 'player' ? 'Opens the lesson player directly on your device' : 'Opens the public course overview page',
      'Use for posters, packaging inserts, and showroom displays',
      "Keep the QR scannable at arm's length",
   ];
   const ITEM_Y = 268;
   const ITEM_GAP = 148;
   const warningItemsSvg = warningItems
      .map((item, i) => {
         const yBase = ITEM_Y + i * ITEM_GAP;
         const ccy = yBase + 32;
         const lines = splitLines(item, 34);
         const sepY = yBase + ITEM_GAP - 20;
        return [
            `<circle cx="92" cy="${ccy}" r="32" fill="#111" stroke="#ffd633" stroke-width="4"/>`,
            `<text x="92" y="${ccy + 10}" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="900" fill="#ffd633" text-anchor="middle">${i + 1}</text>`,
            svgTextLines(lines, 154, yBase + 34, 30, 40, '#111', 800),
            i < warningItems.length - 1
               ? `<line x1="46" y1="${sepY}" x2="${width - 46}" y2="${sepY}" stroke="#111" stroke-width="2" stroke-dasharray="8,8" opacity="0.25"/>`
               : '',
         ].join('\n  ');
      })
      .join('\n  ');

   if (props.layout === 'catalog') {
      return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${renderWidth}" height="${renderHeight}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" rx="36" fill="#f6c51a"/>
  <rect x="0" y="0" width="${width}" height="140" rx="36" fill="#111"/>
  <text x="230" y="66" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800" fill="#fff" letter-spacing="5">RUBYSHOP</text>
  <text x="230" y="98" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="500" fill="#fff" letter-spacing="4">INDUSTRIAL TOOLS AND CONSTRUCTION EQUIPMENT</text>
  <text x="${width - 42}" y="66" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800" fill="#ffd633" text-anchor="end" letter-spacing="4">SCAN FOR COURSE ACCESS</text>
  <rect x="46" y="180" width="${width - 92}" height="118" rx="28" fill="#111" stroke="#000" stroke-width="4"/>
  <text x="72" y="268" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="900" fill="#ffd633">${escapeXml(props.posterTitle.toUpperCase())}</text>
  <text x="64" y="372" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="900" fill="#111">${escapeXml(courseLines[0] || props.courseTitle)}</text>
  <text x="64" y="416" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#2b2b2b" letter-spacing="5">${escapeXml(category.toUpperCase())}</text>
  <rect x="64" y="464" width="456" height="360" rx="24" fill="#f5f0e3" stroke="#111" stroke-width="4"/>
  <circle cx="98" cy="508" r="8" fill="#111"/>
  ${svgTextLines(noteLines, 126, 514, 22, 34, '#111')}
  <circle cx="98" cy="642" r="8" fill="#111"/>
  <text x="126" y="649" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#111">Opens the public course page or player directly</text>
  <circle cx="98" cy="736" r="8" fill="#111"/>
  <text x="126" y="743" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#111">Use this layout for posters, inserts, and displays</text>
  <rect x="554" y="340" width="462" height="560" rx="26" fill="#f6f2e8" stroke="#111" stroke-width="4"/>
  <rect x="574" y="360" width="422" height="286" rx="24" fill="#fff" stroke="#111" stroke-width="4"/>
  ${props.qrUrl ? `<image href="${escapeXml(props.qrUrl)}" x="596" y="382" width="378" height="242" preserveAspectRatio="xMidYMid meet"/>` : ''}
  <rect x="574" y="672" width="422" height="140" rx="18" fill="#111"/>
  <text x="785" y="706" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="800" fill="#ffd633" text-anchor="middle" letter-spacing="4">TARGET URL</text>
  ${svgTextLines(urlLines, 785, 742, 18, 26, '#fff', 700, 'middle')}
  <rect x="46" y="${height - 156}" width="${width - 92}" height="96" rx="18" fill="#1b1b1b"/>
  <text x="72" y="${height - 100}" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#fff">${escapeXml(props.courseTitle)}</text>
  <text x="72" y="${height - 72}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#cfcfcf" letter-spacing="4">${escapeXml(props.brandName.toUpperCase())}</text>
  <rect x="818" y="${height - 134}" width="186" height="40" rx="20" fill="#ffd633" stroke="#111" stroke-width="2"/>
  <text x="911" y="${height - 108}" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="900" fill="#111" text-anchor="middle" letter-spacing="2">${props.targetMode === 'player' ? 'PLAY NOW' : props.targetMode === 'custom' ? 'CUSTOM' : 'OVERVIEW'}</text>
</svg>`;
   }

   return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${renderWidth}" height="${renderHeight}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="warnBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffd633"/>
      <stop offset="100%" stop-color="#f2c500"/>
    </linearGradient>
    <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="26" height="26">
      <circle cx="4" cy="4" r="2.2" fill="#f1b900" opacity="0.2"/>
    </pattern>
    <linearGradient id="footerRed" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#cf1f1f"/>
      <stop offset="100%" stop-color="#e63b22"/>
    </linearGradient>
    <clipPath id="roundedPoster">
      <rect x="0" y="0" width="${width}" height="${height}" rx="40"/>
    </clipPath>
  </defs>

  <rect width="${width}" height="${height}" rx="40" fill="url(#warnBg)"/>
  <rect width="${width}" height="${height}" fill="url(#dotPattern)" opacity="0.65"/>

  <g clip-path="url(#roundedPoster)">
    <rect x="0" y="0" width="${width}" height="112" fill="#111"/>
    <rect x="0" y="0" width="560" height="112" fill="url(#footerRed)"/>
    <polygon points="558,0 744,0 682,112 496,112" fill="#111"/>
    <polygon points="744,0 1024,0 1024,112 682,112" fill="#111"/>
    <polygon points="586,0 662,0 604,112 528,112" fill="#ffd633"/>
    <polygon points="664,0 728,0 670,112 606,112" fill="#111"/>

    <text x="162" y="46" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#fff" letter-spacing="4">RUBYSHOP</text>
    <text x="162" y="76" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#fff" letter-spacing="2">AIRLESS SPRAYER AND POWER TOOLS</text>

    <rect x="${width - 236}" y="24" width="212" height="64" rx="14" fill="#111"/>
    <circle cx="${width - 210}" cy="56" r="10" fill="#ffd633"/>
    <path d="M ${width - 214} 56 l6 -10 l6 10 z" fill="#111"/>
    <text x="${width - 110}" y="49" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="3">SCAN FOR</text>
    <text x="${width - 110}" y="72" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" letter-spacing="3">COURSE ACCESS</text>

    <rect x="132" y="132" width="760" height="148" rx="24" fill="#111" stroke="#000" stroke-width="4"/>
    <polygon points="160,160 192,160 176,190" fill="none" stroke="#ffd633" stroke-width="6" stroke-linejoin="round"/>
    <line x1="176" y1="170" x2="176" y2="180" stroke="#ffd633" stroke-width="8" stroke-linecap="round"/>
    <circle cx="176" cy="186" r="4" fill="#ffd633"/>
    <text x="512" y="264" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="900" fill="#ffd633" text-anchor="middle">${escapeXml(props.posterTitle.toUpperCase())}</text>

    <text x="120" y="356" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="900" fill="#111">${escapeXml(courseLines[0] || props.courseTitle)}</text>
    <text x="120" y="388" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#2b2b2b" letter-spacing="6">${escapeXml(category.toUpperCase())}</text>

    ${warningItemsSvg}

    <rect x="62" y="1044" width="900" height="368" rx="22" fill="#f6f4ee" stroke="#111" stroke-width="4"/>
    <rect x="86" y="1062" width="332" height="300" rx="16" fill="#fff" stroke="#d61f1f" stroke-width="4"/>
    ${props.qrUrl ? `<image href="${escapeXml(props.qrUrl)}" x="100" y="1076" width="304" height="272" preserveAspectRatio="xMidYMid meet"/>` : ''}
    <text x="436" y="1128" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="900" fill="#111" text-anchor="start">SCAN TO VIEW</text>
    <text x="436" y="1180" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="900" fill="#e43b24" text-anchor="start">COURSE ACCESS</text>
    <text x="436" y="1226" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="700" fill="#2b2b2b" text-anchor="start">Open the course overview or player on your phone.</text>
  </g>
</svg>`;
};

const inlineImageAsDataUrl = async (url: string) => {
   if (!url) return '';
   if (url.startsWith('data:')) return url;
   try {
      const response = await fetch(url, { mode: 'cors' });
      if (!response.ok) return url;
      const blob = await response.blob();
      return await blobToDataUrl(blob);
   } catch {
      return '';
   }
};

const loadImage = (src: string) =>
   new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to load poster artwork'));
      image.src = src;
   });

const blobToDataUrl = (blob: Blob) =>
   new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to encode image'));
      reader.readAsDataURL(blob);
   });

const EXPORT_PRESET: { width: number; height: number; scale: number; filename: string } = {
   width: 180,
   height: 248,
   scale: 2,
   filename: 'rubyshop-sticker',
};

const slugify = (value: string) =>
   value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

const escapeXml = (value: string) =>
   value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

const splitLines = (value: string, maxChars: number) => {
   const words = value.split(/\s+/).filter(Boolean);
   const lines: string[] = [];
   let line = '';

   for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (test.length > maxChars && line) {
         lines.push(line);
         line = word;
      } else {
         line = test;
      }
   }

   if (line) lines.push(line);
   return lines.slice(0, 3);
};

const svgTextLines = (lines: string[], x: number, y: number, size: number, lineHeight: number, fill = '#111', weight = 700, anchor: 'start' | 'middle' = 'start') =>
   lines
      .map((line, index) => {
         const dy = index === 0 ? 0 : lineHeight * index;
         return `<text x="${x}" y="${y + dy}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${escapeXml(line)}</text>`;
      })
      .join('');

const absoluteUrl = (value: string) => {
   if (!value) return '';
   if (typeof window === 'undefined') return value;
   if (/^https?:\/\//i.test(value)) return value;
   return value.startsWith('/') ? `${window.location.origin}${value}` : `${window.location.origin}/${value}`;
};

export default CourseQrPoster;
