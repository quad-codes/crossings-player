import * as Sentry from "@sentry/react-native"

export const setup = ({
	routingInstrumentation,
}: {
	routingInstrumentation: Sentry.ReactNavigationInstrumentation
}) => {
	Sentry.init({
		dsn: "https://e1ba6dbb950bb066824453d66881dbf5@us.sentry.io/4506697646014464",
		// Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
		// We recommend adjusting this value in production.
		tracesSampleRate: 1.0,
		debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
		integrations: [new Sentry.ReactNativeTracing({ routingInstrumentation })],
	})
}
