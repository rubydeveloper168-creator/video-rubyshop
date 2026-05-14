import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { onHandleChange } from '@/lib/inertia';
import { SharedData } from '@/types/global';
import { useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface SocialLink {
   host: string;
   profile_link: string;
}

type SocialLinksMap = {
   website: string;
   facebook: string;
   twitter: string;
   linkedin: string;
};

const MyProfile = () => {
   const { auth, errors } = usePage<SharedData>().props;
   const user = auth.user;
   const [userPhoto, setUserPhoto] = useState(user.photo);
   const [socialLinks, setSocialLinks] = useState<SocialLinksMap>({
      website: '',
      facebook: '',
      twitter: '',
      linkedin: '',
   });

   const parseSocialLinks = useCallback((socialLinksData: unknown) => {
      try {
         if (!socialLinksData) return;

         const links: SocialLink[] = typeof socialLinksData === 'string' ? JSON.parse(socialLinksData) : (socialLinksData as SocialLink[]);

         const linkMap: SocialLinksMap = {
            website: '',
            facebook: '',
            twitter: '',
            linkedin: '',
         };

         links.forEach((link) => {
            if (link.host in linkMap) {
               linkMap[link.host as keyof SocialLinksMap] = link.profile_link;
            }
         });

         setSocialLinks(linkMap);
      } catch (error) {
         // Failed to parse social links
      }
   }, []);

   useEffect(() => {
      parseSocialLinks(user.social_links);
   }, [user.social_links]);

   const formatSocialLinks = useCallback((links: SocialLinksMap): string => {
      const formattedLinks = Object.entries(links)
         .filter(([_, value]) => value)
         .map(([host, profile_link]) => ({ host, profile_link }));

      return JSON.stringify(formattedLinks);
   }, []);

   const updateSocialLink = useCallback((platform: keyof SocialLinksMap, value: string) => {
      setSocialLinks((prev) => ({
         ...prev,
         [platform]: value,
      }));
   }, []);

   const { data, post, setData, processing } = useForm({
      name: user.name || '',
      photo: null as File | null,
      social_links: null as string | null,
   });

   useEffect(() => {
      setData('social_links', formatSocialLinks(socialLinks));
   }, [socialLinks, formatSocialLinks, setData]);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('student.profile.update'));
   };

   const onImageChange = (name: string, value: unknown) => {
      setData(name as any, value as any);
      setUserPhoto(URL.createObjectURL(value as File));
   };

   return (
      <form onSubmit={handleSubmit} className="bg-card grid grid-cols-1 gap-6 rounded-lg p-6 md:grid-cols-2">
         <div className="col-span-full space-y-1">
            <div className="border-border h-[150px] w-[150px] rounded-full border border-dashed p-1.5">
               <div className="border-border relative h-full w-full overflow-hidden rounded-full border">
                  <img
                     alt={`${auth.user.name}'s profile`}
                     src={userPhoto || '/assets/icons/avatar.png'}
                     className="h-full w-full content-center object-cover"
                  />

                  <label
                     htmlFor="formFile"
                     className="text-primary-foreground absolute right-0 bottom-0 flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity duration-300 hover:opacity-100"
                  >
                     <Camera className="h-7 w-7" />
                     <span className="text-xs">Upload Photo</span>
                  </label>

                  <input hidden type="file" id="formFile" name="photo" onChange={(e) => onHandleChange(e, onImageChange)} />
               </div>
            </div>

            {errors.photo && <p className="mt-1 text-sm text-red-500">{errors.photo}</p>}
         </div>

         <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={data.name} onChange={(e) => onHandleChange(e, setData)} className="mt-1" placeholder="John Doe" />
            <InputError message={errors.name} />
         </div>

         <div>
            <Label>Website</Label>
            <Input
               type="url"
               name="website"
               value={socialLinks.website}
               onChange={(e) => updateSocialLink('website', e.target.value)}
               className="mt-1"
               placeholder="https://example.com"
            />
         </div>

         <div>
            <Label>Facebook</Label>
            <Input
               type="url"
               name="facebook"
               value={socialLinks.facebook}
               onChange={(e) => updateSocialLink('facebook', e.target.value)}
               className="mt-1"
               placeholder="https://facebook.com/my-profile"
            />
         </div>

         <div>
            <Label>Twitter</Label>
            <Input
               type="url"
               name="twitter"
               value={socialLinks.twitter}
               onChange={(e) => updateSocialLink('twitter', e.target.value)}
               className="mt-1"
               placeholder="https://twitter.com/my-profile"
            />
         </div>

         <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
               id="linkedin"
               name="linkedin"
               value={socialLinks.linkedin}
               onChange={(e) => updateSocialLink('linkedin', e.target.value)}
               className="mt-1"
               placeholder="https://linkedin.com/my-profile"
            />
         </div>

         <div className="col-span-full flex items-center justify-end pt-2">
            <LoadingButton loading={processing}>Update Profile</LoadingButton>
         </div>
      </form>
   );
};

export default MyProfile;
