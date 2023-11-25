

export const formattedDate = (data: any) => new Date( data ).toLocaleDateString( "en-US", {
	day: "numeric",
	month: "long",
	year: "numeric"
} );