declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"berita": {
"kkb-ditangkap-kst.md": {
	id: "kkb-ditangkap-kst.md";
  slug: "kkb-ditangkap-kst";
  body: string;
  collection: "berita";
  data: InferEntrySchema<"berita">
} & { render(): Render[".md"] };
"peluncuran-portal-caaip.md": {
	id: "peluncuran-portal-caaip.md";
  slug: "peluncuran-portal-caaip";
  body: string;
  collection: "berita";
  data: InferEntrySchema<"berita">
} & { render(): Render[".md"] };
"selamat-dan-sukses.md": {
	id: "selamat-dan-sukses.md";
  slug: "selamat-dan-sukses";
  body: string;
  collection: "berita";
  data: InferEntrySchema<"berita">
} & { render(): Render[".md"] };
};
"kabar-duka": {
"in-memoriam-2025-10-31.md": {
	id: "in-memoriam-2025-10-31.md";
  slug: "in-memoriam-2025-10-31";
  body: string;
  collection: "kabar-duka";
  data: any
} & { render(): Render[".md"] };
};
"kabarDuka": {
"2025-11-02-in-memoriam-justice.md": {
	id: "2025-11-02-in-memoriam-justice.md";
  slug: "2025-11-02-in-memoriam-justice";
  body: string;
  collection: "kabarDuka";
  data: InferEntrySchema<"kabarDuka">
} & { render(): Render[".md"] };
"2025-11-03-map-lang-id-draft-false-name-kolonel-sus-iskandar-date-2025-11-01t14-59-00-000-07-00-message-telah-berpulang-ke-rahmatullah-kolonel-arm-mamat.md": {
	id: "2025-11-03-map-lang-id-draft-false-name-kolonel-sus-iskandar-date-2025-11-01t14-59-00-000-07-00-message-telah-berpulang-ke-rahmatullah-kolonel-arm-mamat.md";
  slug: "2025-11-03-map-lang-id-draft-false-name-kolonel-sus-iskandar-date-2025-11-01t14-59-00-000-07-00-message-telah-berpulang-ke-rahmatullah-kolonel-arm-mamat";
  body: string;
  collection: "kabarDuka";
  data: InferEntrySchema<"kabarDuka">
} & { render(): Render[".md"] };
"in-memoriam-2025-10-31.md": {
	id: "in-memoriam-2025-10-31.md";
  slug: "in-memoriam-2025-10-31";
  body: string;
  collection: "kabarDuka";
  data: InferEntrySchema<"kabarDuka">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"alumni": {
"1991": {
	id: "1991";
  collection: "alumni";
  data: InferEntrySchema<"alumni">
};
"2005": {
	id: "2005";
  collection: "alumni";
  data: InferEntrySchema<"alumni">
};
"2019": {
	id: "2019";
  collection: "alumni";
  data: InferEntrySchema<"alumni">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
