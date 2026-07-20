import React, { useState } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import PageHeader from "../../components/UI/PageHeader";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { themes, applyTheme, applyFontSize, applyMode, applyFontFamily, fonts, resetToDefaults } from "../../utils/themeEngine";
import { getTranslation } from "../../utils/linguaEngine";

const MotionDiv = motion.div;

const Appearance = () => {
  const [activeTheme, setActiveTheme] = useState(localStorage.getItem("portal-theme") || "neon-blue");
  const [fontSize, setFontSize] = useState(localStorage.getItem("portal-font-size") || "medium");
  const [activeFont, setActiveFont] = useState(localStorage.getItem("portal-font-family") || "sans");
  const [mode, setMode] = useState(localStorage.getItem("portal-mode") || "dark");

  const handleRestore = () => {
     Swal.fire({
        title: "Reboot Portal DNA?",
        text: "This will wipe all custom aesthetics and synchronize with official factory nodes.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Initialize Reboot",
        background: mode === 'dark' ? '#0f172a' : '#ffffff',
        color: mode === 'dark' ? '#ffffff' : '#0f172a'
     }).then((result) => {
        if (result.isConfirmed) {
           resetToDefaults();
           // Force reload or update all states to reflect defaults
           window.location.reload(); 
        }
     });
  };

  const handleFontChange = (fontId) => {
    setActiveFont(fontId);
    applyFontFamily(fontId);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Typography Matched',
      showConfirmButton: false,
      timer: 1500,
      background: mode === 'dark' ? '#0f172a' : '#ffffff',
      color: mode === 'dark' ? '#ffffff' : '#0f172a'
    });
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    applyMode(newMode);
    
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${newMode === 'dark' ? 'Night Node' : 'Solar Node'} Active`,
      showConfirmButton: false,
      timer: 1500,
      background: newMode === 'dark' ? '#0f172a' : '#ffffff',
      color: newMode === 'dark' ? '#ffffff' : '#0f172a'
    });
  };

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    applyTheme(themeId);
    
    const selectedTheme = themes.find(t => t.id === themeId);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `${selectedTheme.name} Node Synchronized`,
      showConfirmButton: false,
      timer: 2000,
      background: '#0f172a',
      color: '#f8fafc'
    });
  };

  const updateFontSize = (size) => {
     setFontSize(size);
     applyFontSize(size);
  };

  return (
    <div className="page-shell space-y-8 pb-12">
      <PageHeader
        title={getTranslation("appearance")}
        subtitle="Reprogram your portal's appearance node and personalize your Command Center DNA."
      />

      <MDBRow className="g-6">
        {/* Theme Presets */}
        <MDBCol lg="8">
           <MotionDiv 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="surface-card rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden h-full"
           >
              <div className="px-6 md:px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-sm">
                      <MDBIcon fas icon="palette" />
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight">Theme Archetypes</h3>
                 </div>
              </div>

              <div className="p-3 xs:p-5 md:p-8">
                 <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 md:gap-6">
                    {themes.map((theme) => (
                      <MotionDiv
                        key={theme.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleThemeChange(theme.id)}
                        className={`cursor-pointer p-3 xs:p-4 md:p-6 rounded-xl xs:rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all ${activeTheme === theme.id ? 'border-primary-color bg-white/[0.05]' : 'border-white/5 bg-transparent hover:border-white/10'}`}
                        style={{ '--primary-color': theme.color }}
                      >
                         <div className="flex items-center gap-2 xs:gap-4">
                            <div className="h-8 xs:h-12 md:h-14 w-8 xs:w-12 md:w-14 rounded-lg xs:rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0" style={{ background: `linear-gradient(135deg, ${theme.color}, ${theme.secondary})` }}>
                               <MDBIcon fas icon="brush" className="text-[10px] xs:text-base" />
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-[9px] xs:text-xs md:text-sm font-black text-white uppercase tracking-tighter truncate">{theme.name}</h4>
                               <p className="text-[7px] xs:text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">{theme.desc}</p>
                            </div>
                            {activeTheme === theme.id && (
                              <div className="ml-auto h-4 w-4 xs:h-6 xs:w-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
                                 <MDBIcon fas icon="check" className="text-white text-[7px] xs:text-[10px]" />
                              </div>
                            )}
                         </div>
                      </MotionDiv>
                    ))}
                 </div>
              </div>
           </MotionDiv>
        </MDBCol>

        {/* Global Controls */}
        <MDBCol lg="4">
           <div className="space-y-4 xs:space-y-6">
              <MotionDiv 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="surface-card rounded-[1.5rem] xs:rounded-[2rem] md:rounded-[2.5rem] p-4 xs:p-6 md:p-8 border border-white/5 shadow-2xl"
              >
                 <p className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] text-slate-500 mb-4 xs:mb-8">Mode Synchronizer</p>
                 <div className="flex gap-2 xs:gap-4">
                    <button
                      onClick={() => handleModeChange('light')}
                      className={`flex-1 py-3 xs:py-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center gap-1 xs:gap-2 ${mode === 'light' ? 'border-primary-theme bg-primary-theme/5 text-primary-theme shadow-lg shadow-primary-theme/20' : 'border-white/5 text-slate-500'}`}
                    >
                       <MDBIcon fas icon="sun" className="text-xs xs:text-base" />
                       <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-widest">Solar</span>
                    </button>
                    <button
                      onClick={() => handleModeChange('dark')}
                      className={`flex-1 py-3 xs:py-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center gap-1 xs:gap-2 ${mode === 'dark' ? 'border-primary-theme bg-primary-theme/5 text-primary-theme shadow-lg shadow-primary-theme/20' : 'border-white/5 text-slate-500'}`}
                    >
                       <MDBIcon fas icon="moon" className="text-xs xs:text-base" />
                       <span className="text-[8px] xs:text-[9px] font-black uppercase tracking-widest">Night</span>
                    </button>
                 </div>
              </MotionDiv>

              <MotionDiv 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="surface-card rounded-[1.5rem] xs:rounded-[2rem] md:rounded-[2.5rem] p-4 xs:p-6 md:p-8 border border-white/5 shadow-2xl"
              >
                 <p className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] text-slate-500 mb-4 xs:mb-8">Font Matrix</p>
                 <div className="space-y-2 xs:space-y-3">
                    {fonts.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => handleFontChange(f.id)}
                        className={`w-full text-left px-3 xs:px-5 py-2 xs:py-3 rounded-lg xs:rounded-xl border-2 transition-all flex justify-between items-center ${activeFont === f.id ? 'border-primary-theme bg-primary-theme/5' : 'border-white/5 hover:border-white/10'}`}
                      >
                         <span className="text-[10px] xs:text-xs font-bold truncate pr-2" style={{ fontFamily: f.family }}>{f.name}</span>
                         {activeFont === f.id && <MDBIcon fas icon="check-circle" className="text-primary-theme shrink-0 text-xs" />}
                      </button>
                    ))}
                 </div>
              </MotionDiv>

              <MotionDiv 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="surface-card rounded-[1.5rem] xs:rounded-[2rem] md:rounded-[2.5rem] p-4 xs:p-6 md:p-8 border border-white/5 shadow-2xl"
              >
                 <p className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] text-slate-500 mb-4 xs:mb-8">Typography Scaling</p>
                 
                 <div className="grid grid-cols-3 gap-2 xs:gap-3">
                    {[
                      { id: 'small', label: 'Compact', icon: 'compress-alt' },
                      { id: 'medium', label: 'Standard', icon: 'font' },
                      { id: 'large', label: 'Expanded', icon: 'expand-alt' }
                    ].map((size) => (
                      <button
                        key={size.id}
                        onClick={() => updateFontSize(size.id)}
                        className={`flex flex-col items-center justify-center gap-1.5 xs:gap-2 p-2 xs:p-4 rounded-xl md:rounded-2xl border-2 transition-all min-h-[60px] xs:min-h-[auto] ${fontSize === size.id ? 'border-primary-theme bg-white/[0.05] text-primary-theme shadow-lg shadow-primary-theme/20' : 'border-white/5 text-slate-500 hover:border-white/10'}`}
                      >
                         <MDBIcon fas icon={size.icon} className="text-[9px] xs:text-sm shrink-0" />
                         <span className="text-[6px] xs:text-[8px] font-black uppercase tracking-widest text-center leading-tight">{size.label}</span>
                      </button>
                    ))}
                 </div>
              </MotionDiv>


              <MDBCard className="surface-card rounded-[1.5rem] xs:rounded-[2rem] md:rounded-[2.5rem] p-4 xs:p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-blue-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="relative z-10 text-center">
                    <p className="text-[9px] xs:text-[10px] font-black uppercase tracking-[0.2em] xs:tracking-[0.3em] text-slate-500 mb-4 xs:mb-6">Reset All Protocols</p>
                    <MDBBtn onClick={handleRestore} outline className="btn-ui-glass w-full rounded-xl md:rounded-2xl py-2 xs:py-3 border-white/5 text-slate-400 hover:text-white transition-all uppercase text-[8px] xs:text-[10px] font-black tracking-widest">
                       Initialize Factory Reboot
                    </MDBBtn>
                 </div>
              </MDBCard>
           </div>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default Appearance;

