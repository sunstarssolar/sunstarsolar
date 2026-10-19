import { z } from "zod";

export const loginSchema = z.object({
  workerCode: z.string().trim().regex(/^SMW-[A-Z0-9-]{3,30}$/i),
  pin: z.string().trim().regex(/^\d{4,8}$/)
});

export const projectSchema = z.object({
  customerName: z.string().trim().min(2).max(120),
  customerMobile: z.string().trim().regex(/^[6-9]\d{9}$/),
  fullAddress: z.string().trim().max(500).optional().or(z.literal("")),

  city: z.string().trim().min(2).max(80),
  district: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(80),
  pincode: z.string().trim().regex(/^\d{6}$/).optional().or(z.literal("")),

  projectType: z.enum(["Residential", "Commercial", "Industrial", "Agricultural", "Other"]),
  capacityKw: z.coerce.number().positive().max(10000),

  panelBrand: z.string().trim().max(100).optional().or(z.literal("")),
  inverterBrand: z.string().trim().max(100).optional().or(z.literal("")),

  installationDate: z.string().optional().or(z.literal("")),
  completionDate: z.string().optional().or(z.literal("")),

  status: z.enum(["Completed", "In Progress"]).default("Completed"),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  publicImageUrls: z.array(z.string().url()).max(10).default([])
});