import { relations } from "drizzle-orm/relations";
import { visitors, humanVisits } from "./schema";

export const humanVisitsRelations = relations(humanVisits, ({one}) => ({
	visitor: one(visitors, {
		fields: [humanVisits.visitorId],
		references: [visitors.visitorId]
	}),
}));

export const visitorsRelations = relations(visitors, ({many}) => ({
	humanVisits: many(humanVisits),
}));