import time


class RetryManager:

    MAX_RETRIES = 3

    INITIAL_DELAY = 1

    BACKOFF = 2

    def run(self, operation):
        print("=" * 60)
        print("Retry Manager")
        print("=" * 60)

        delay = self.INITIAL_DELAY

        last_error = None

        for attempt in range(1, self.MAX_RETRIES + 1):

            try:

                print(f"[Retry] Attempt {attempt}")

                return operation()

            except Exception as e:

                last_error = e

                if attempt == self.MAX_RETRIES:
                    break

                print(
                    f"[Retry] Failed ({e}), retrying in {delay}s..."
                )

                time.sleep(delay)

                delay *= self.BACKOFF

        raise last_error
