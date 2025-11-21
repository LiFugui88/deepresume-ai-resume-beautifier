import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronRight, ChevronLeft, Sparkles, Briefcase, GraduationCap, User, Wrench } from 'lucide-react';

interface ManualEntryFormProps {
    onSubmit: (data: string) => void;
    onCancel: () => void;
    isAnalyzing: boolean;
    language: 'en' | 'zh';
}

export const ManualEntryForm: React.FC<ManualEntryFormProps> = ({ onSubmit, onCancel, isAnalyzing, language }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        basics: { name: '', label: '', email: '', phone: '', url: '', summary: '' },
        work: [{ company: '', position: '', startDate: '', endDate: '', summary: '' }],
        education: [{ institution: '', area: '', studyType: '', startDate: '', endDate: '' }],
        skills: ''
    });

    const t = {
        en: {
            steps: ['Basics', 'Experience', 'Education', 'Skills'],
            next: 'Next',
            back: 'Back',
            submit: 'Optimize & Generate',
            add: 'Add Item',
            remove: 'Remove',
            basics: {
                title: 'Personal Information',
                name: 'Full Name',
                label: 'Professional Title (e.g. Product Manager)',
                email: 'Email',
                phone: 'Phone',
                url: 'LinkedIn / Website',
                summary: 'Professional Summary (Draft)',
                summaryPlaceholder: 'Briefly describe your background...'
            },
            work: {
                title: 'Work Experience',
                company: 'Company Name',
                position: 'Job Title',
                start: 'Start Date',
                end: 'End Date',
                summary: 'Description (Draft)',
                summaryPlaceholder: 'e.g. Responsible for sales team...'
            },
            education: {
                title: 'Education',
                institution: 'School / University',
                area: 'Major',
                studyType: 'Degree',
                start: 'Start Date',
                end: 'End Date'
            },
            skills: {
                title: 'Skills',
                label: 'List your skills (comma separated)',
                placeholder: 'e.g. React, TypeScript, Project Management...'
            }
        },
        zh: {
            steps: ['基本信息', '工作经历', '教育背景', '技能特长'],
            next: '下一步',
            back: '上一步',
            submit: 'AI 优化并生成',
            add: '添加一项',
            remove: '删除',
            basics: {
                title: '基本信息',
                name: '姓名',
                label: '求职意向 (如：产品经理)',
                email: '邮箱',
                phone: '电话',
                url: '个人主页 / LinkedIn',
                summary: '个人简介 (草稿)',
                summaryPlaceholder: '简要描述您的背景...'
            },
            work: {
                title: '工作经历',
                company: '公司名称',
                position: '职位',
                start: '开始时间',
                end: '结束时间',
                summary: '工作内容 (草稿)',
                summaryPlaceholder: '例如：负责销售团队管理...'
            },
            education: {
                title: '教育背景',
                institution: '学校',
                area: '专业',
                studyType: '学历',
                start: '开始时间',
                end: '结束时间'
            },
            skills: {
                title: '技能特长',
                label: '列出您的技能 (用逗号分隔)',
                placeholder: '例如：Java, 沟通能力, 项目管理...'
            }
        }
    };

    const text = language === 'en' ? t.en : t.zh;

    const handleChange = (section: string, field: string, value: string, index?: number) => {
        setFormData(prev => {
            if (section === 'basics' || section === 'skills') {
                return { ...prev, [section]: section === 'skills' ? value : { ...prev.basics, [field]: value } };
            }
            const list = [...(prev as any)[section]];
            list[index!] = { ...list[index!], [field]: value };
            return { ...prev, [section]: list };
        });
    };

    const addItem = (section: 'work' | 'education') => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], section === 'work'
                ? { company: '', position: '', startDate: '', endDate: '', summary: '' }
                : { institution: '', area: '', studyType: '', startDate: '', endDate: '' }]
        }));
    };

    const removeItem = (section: 'work' | 'education', index: number) => {
        setFormData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = () => {
        // Convert structured data to a prompt-friendly string
        const prompt = `
Please create a resume based on the following information. 
IMPORTANT: The user input might be simple or rough. You MUST rewrite and polish the content to be professional, using action verbs and the STAR method where appropriate.

Basic Info:
Name: ${formData.basics.name}
Role: ${formData.basics.label}
Email: ${formData.basics.email}
Phone: ${formData.basics.phone}
Link: ${formData.basics.url}
Summary: ${formData.basics.summary}

Experience:
${formData.work.map(w => `
- Company: ${w.company}
  Role: ${w.position}
  Date: ${w.startDate} - ${w.endDate}
  Description: ${w.summary}
`).join('\n')}

Education:
${formData.education.map(e => `
- School: ${e.institution}
  Degree: ${e.studyType} in ${e.area}
  Date: ${e.startDate} - ${e.endDate}
`).join('\n')}

Skills:
${formData.skills}
        `;
        onSubmit(prompt);
    };

    const steps = [
        // Step 0: Basics
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2"><User size={20} />{text.basics.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={text.basics.name} value={formData.basics.name} onChange={e => handleChange('basics', 'name', e.target.value)} className="p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none" />
                <input type="text" placeholder={text.basics.label} value={formData.basics.label} onChange={e => handleChange('basics', 'label', e.target.value)} className="p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none" />
                <input type="email" placeholder={text.basics.email} value={formData.basics.email} onChange={e => handleChange('basics', 'email', e.target.value)} className="p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none" />
                <input type="text" placeholder={text.basics.phone} value={formData.basics.phone} onChange={e => handleChange('basics', 'phone', e.target.value)} className="p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none" />
                <input type="text" placeholder={text.basics.url} value={formData.basics.url} onChange={e => handleChange('basics', 'url', e.target.value)} className="col-span-1 md:col-span-2 p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none" />
                <textarea placeholder={text.basics.summaryPlaceholder} value={formData.basics.summary} onChange={e => handleChange('basics', 'summary', e.target.value)} className="col-span-1 md:col-span-2 p-3 rounded-xl border border-ink/10 bg-white focus:ring-2 focus:ring-accent outline-none h-24 resize-none" />
            </div>
        </div>,
        // Step 1: Work
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2"><Briefcase size={20} />{text.work.title}</h3>
            {formData.work.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border border-ink/10 space-y-3 relative group">
                    <button onClick={() => removeItem('work', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="text" placeholder={text.work.company} value={item.company} onChange={e => handleChange('work', 'company', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <input type="text" placeholder={text.work.position} value={item.position} onChange={e => handleChange('work', 'position', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <input type="text" placeholder={text.work.start} value={item.startDate} onChange={e => handleChange('work', 'startDate', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <input type="text" placeholder={text.work.end} value={item.endDate} onChange={e => handleChange('work', 'endDate', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <textarea placeholder={text.work.summaryPlaceholder} value={item.summary} onChange={e => handleChange('work', 'summary', e.target.value, index)} className="col-span-1 md:col-span-2 p-2 rounded-lg border border-ink/10 outline-none focus:border-accent h-20 resize-none" />
                    </div>
                </div>
            ))}
            <button onClick={() => addItem('work')} className="w-full py-3 border-2 border-dashed border-ink/10 rounded-xl text-ink-light hover:text-accent hover:border-accent/30 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
                <Plus size={16} /> {text.add}
            </button>
        </div>,
        // Step 2: Education
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2"><GraduationCap size={20} />{text.education.title}</h3>
            {formData.education.map((item, index) => (
                <div key={index} className="p-4 bg-white rounded-xl border border-ink/10 space-y-3 relative group">
                    <button onClick={() => removeItem('education', index)} className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input type="text" placeholder={text.education.institution} value={item.institution} onChange={e => handleChange('education', 'institution', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <input type="text" placeholder={text.education.area} value={item.area} onChange={e => handleChange('education', 'area', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <input type="text" placeholder={text.education.studyType} value={item.studyType} onChange={e => handleChange('education', 'studyType', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder={text.education.start} value={item.startDate} onChange={e => handleChange('education', 'startDate', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                            <input type="text" placeholder={text.education.end} value={item.endDate} onChange={e => handleChange('education', 'endDate', e.target.value, index)} className="p-2 rounded-lg border border-ink/10 outline-none focus:border-accent" />
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={() => addItem('education')} className="w-full py-3 border-2 border-dashed border-ink/10 rounded-xl text-ink-light hover:text-accent hover:border-accent/30 transition-colors flex items-center justify-center gap-2 font-bold text-sm">
                <Plus size={16} /> {text.add}
            </button>
        </div>,
        // Step 3: Skills
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2"><Wrench size={20} />{text.skills.title}</h3>
            <div className="p-4 bg-white rounded-xl border border-ink/10">
                <label className="block text-sm font-bold text-ink-light mb-2">{text.skills.label}</label>
                <textarea placeholder={text.skills.placeholder} value={formData.skills} onChange={e => handleChange('skills', '', e.target.value)} className="w-full p-3 rounded-lg border border-ink/10 outline-none focus:border-accent h-32 resize-none" />
            </div>
        </div>
    ];

    return (
        <div className="w-full max-w-2xl mx-auto bg-paper p-6 rounded-3xl shadow-sm border border-ink/5">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 px-2">
                {text.steps.map((s, i) => (
                    <div key={i} className={`flex flex-col items-center gap-2 ${i <= step ? 'text-accent' : 'text-ink-light/30'}`}>
                        <div className={`w-3 h-3 rounded-full ${i <= step ? 'bg-accent' : 'bg-ink-light/20'}`} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">{s}</span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {steps[step]}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-ink/5">
                <button
                    onClick={step === 0 ? onCancel : () => setStep(s => s - 1)}
                    className="px-6 py-3 rounded-xl font-bold text-sm text-ink-light hover:bg-white hover:text-ink transition-colors"
                    disabled={isAnalyzing}
                >
                    {step === 0 ? text.back : text.back}
                </button>

                {step < steps.length - 1 ? (
                    <button
                        onClick={() => setStep(s => s + 1)}
                        className="px-6 py-3 bg-ink text-white rounded-xl font-bold text-sm hover:bg-accent transition-colors flex items-center gap-2"
                    >
                        {text.next} <ChevronRight size={16} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isAnalyzing}
                        className="px-8 py-3 bg-gradient-to-r from-accent to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-accent/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isAnalyzing ? (
                            <span className="animate-pulse">Processing...</span>
                        ) : (
                            <>
                                <Sparkles size={16} /> {text.submit}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
